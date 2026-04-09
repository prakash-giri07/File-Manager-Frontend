import axios from "axios";
import { facebookDummyData } from "../mock/facebookDummyData";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

//  Toggle (switch to false when API is ready)
const USE_DUMMY = true;

// ================= AXIOS INSTANCE =================
const api = axios.create({
  baseURL: "http://localhost:5000/api/facebook",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error.message);

    return Promise.reject({
      message: error?.response?.data?.message || "Something went wrong",
      status: error?.response?.status || 500,
    });
  },
);

// ================= HELPER =================
const buildParams = ({ campaign, startDate, endDate } = {}) => {
  const params = {};
  if (campaign) params.campaign = campaign;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  return params;
};

// =================  TRANSFORM FUNCTION =================
const normalizeCampaigns = (accounts = []) => {
  const campaigns = [];

  accounts.forEach((account) => {
    account.campaigns?.forEach((campaign) => {
      const insight = campaign.insights?.data?.[0] || {};

      const spend = Number(insight.spend || 0);
      const impressions = Number(insight.impressions || 0);

      //  FUTURE SAFE (will work when API gives these)
      const clicks = Number(insight.clicks || 0);
      const ctr = Number(insight.ctr || 0);
      const cpc = Number(insight.cpc || 0);

      campaigns.push({
        id: campaign.id,
        name: campaign.name,
        accountName: account.name,

        spend,
        impressions,

        //  these will be 0 now, real later
        clicks,
        ctr,
        cpc,

        date: insight.date_start || null,
      });
    });
  });

  return campaigns;
};

// ================= HEALTH CHECK =================
export const checkFacebookAPI = async () => {
  try {
    if (USE_DUMMY) return { status: "OK (Dummy Mode)" };

    const res = await api.get("/health");
    return res.data;
  } catch (error) {
    console.error("Health check failed:", error.message);
    return null;
  }
};

// ================= CAMPAIGNS =================
export const getCampaigns = async (filters = {}) => {
  try {
    if (USE_DUMMY) {
      await new Promise((res) => setTimeout(res, 300));

      let campaigns = normalizeCampaigns(facebookDummyData);

      // account filter
      if (filters.account && filters.account.length) {
        const accounts = Array.isArray(filters.account)
          ? filters.account
          : [filters.account];

        campaigns = campaigns.filter((c) => accounts.includes(c.accountName));
      }

      // campaign filter
      if (filters.campaign && filters.campaign.length) {
        const campaignsFilter = Array.isArray(filters.campaign)
          ? filters.campaign
          : [filters.campaign];

        campaigns = campaigns.filter((c) => campaignsFilter.includes(c.name));
      }

      // DATE FILTER
      if (filters.startDate && filters.endDate) {
        campaigns = campaigns.filter((c) => {
          if (!c.date) return false;

          return dayjs(c.date).isBetween(
            dayjs(filters.startDate),
            dayjs(filters.endDate),
            "day",
            "[]",
          );
        });
      }

      return campaigns;
    }

    const params = buildParams(filters);

    const response = await api.get("/campaigns", { params });

    //  IMPORTANT → normalize API response also
    return normalizeCampaigns(response.data || []);
  } catch (error) {
    console.error("Error fetching campaigns:", error.message);
    return [];
  }
};

// ================= KPI =================
export const getKPI = async (filters = {}) => {
  try {
    const campaigns = await getCampaigns(filters);

    const spend = campaigns.reduce((sum, c) => sum + c.spend, 0);
    const impressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);

    const clicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

    const ctr = impressions
      ? Number(((clicks / impressions) * 100).toFixed(2))
      : 0;

    const cpc = clicks ? Number((spend / clicks).toFixed(2)) : 0;

    return { spend, impressions, clicks, ctr, cpc };
  } catch (error) {
    console.error("Error fetching KPI:", error.message);

    return {
      spend: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      cpc: 0,
    };
  }
};

// ================= FORCE REFRESH =================
export const refreshDashboardData = async (filters = {}) => {
  try {
    const [campaigns, kpi] = await Promise.all([
      getCampaigns(filters),
      getKPI(filters),
    ]);

    return { campaigns, kpi };
  } catch (error) {
    console.error("Dashboard refresh error:", error.message);

    return {
      campaigns: [],
      kpi: {
        spend: 0,
        impressions: 0,
        clicks: 0,
        ctr: 0,
        cpc: 0,
      },
    };
  }
};
