import { useState } from "react";
import { Spin, Empty } from "antd";
import { useQuery } from "@tanstack/react-query";

import KPIcards from "./components/KPIcards";
import Filters from "./components/Filters";
import CampaignTable from "./components/CampaignTable";
import Charts from "./components/Charts";

import { getCampaigns, getKPI } from "../../services/facebookService";

const FacebookDashboard = () => {
    const [filters, setFilters] = useState({});

    // ================= CAMPAIGNS =================
    const {
        data: campaigns = [],
        isLoading: campaignsLoading,
        isFetching: campaignsFetching,
        error: campaignsError,
    } = useQuery({
        queryKey: ["campaigns", filters],
        queryFn: () => getCampaigns(filters),
        cacheTime: 0,
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        keepPreviousData: false,
    });

    // ================= KPI =================
    const {
        data: kpi = {},
        isLoading: kpiLoading,
        isFetching: kpiFetching,
        error: kpiError,
    } = useQuery({
        queryKey: ["kpi", filters],
        queryFn: () => getKPI(filters),
        cacheTime: 0,
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const loading = campaignsLoading || kpiLoading;
    const fetching = campaignsFetching || kpiFetching;

    const handleFilterChange = (newFilter) => {
        setFilters((prev) => ({ ...prev, ...newFilter }));
    };

    // ================= ERROR =================
    if (campaignsError || kpiError) {
        return (
            <div className="p-4">
                <h2>Error loading dashboard</h2>
                <p>Please check backend or API connection.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="mb-4">Facebook Campaign Dashboard</h2>

            <Filters
                onFilterChange={handleFilterChange}
                campaigns={campaigns}
            />

            {loading ? (
                <div className="flex justify-center mt-5">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    {fetching && (
                        <div style={{ marginBottom: 10 }}>
                            <Spin size="small" /> Updating...
                        </div>
                    )}

                    <KPIcards kpi={kpi} loading={loading} />

                    {/* {campaigns.length > 0 ? (
                        <Charts campaigns={campaigns} loading={loading} />
                    ) : (
                        <Empty description="No campaign data" />
                    )} */}

                    <CampaignTable campaigns={campaigns} loading={loading} />
                </>
            )}
        </div>
    );
};

export default FacebookDashboard;