import axios from "axios";

// ================= AXIOS INSTANCE (NO CACHE) =================
const api = axios.create({
  baseURL: "http://localhost:5000/api/facebook",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store, no-cache, must-revalidate, private",
    Pragma: "no-cache",
    Expires: "0",
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

// ================= HEALTH CHECK =================
export const checkFacebookAPI = async () => {
  try {
    const res = await api.get("/health", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch (error) {
    console.error("Health check failed:", error.message);
    return null;
  }
};

// ================= CAMPAIGNS =================
export const getCampaigns = async (filters = {}) => {
  try {
    const params = buildParams(filters);

    const response = await api.get("/campaigns", {
      params,
      headers: { "Cache-Control": "no-store" },
    });

    return response.data || [];
  } catch (error) {
    console.error("Error fetching campaigns:", error.message);
    return [];
  }
};

// ================= KPI =================
export const getKPI = async (filters = {}) => {
  try {
    const params = buildParams(filters);

    const response = await api.get("/kpi", {
      params,
      headers: { "Cache-Control": "no-store" },
    });

    return (
      response.data || {
        spend: 0,
        clicks: 0,
        ctr: 0,
        cpc: 0,
      }
    );
  } catch (error) {
    console.error("Error fetching KPI:", error.message);

    return {
      spend: 0,
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
        clicks: 0,
        ctr: 0,
        cpc: 0,
      },
    };
  }
};
