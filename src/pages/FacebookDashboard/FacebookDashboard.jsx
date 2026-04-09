import { useState } from "react";
import { Spin } from "antd";
import { useQuery } from "@tanstack/react-query";

import KPIcards from "./components/KPIcards";
import Filters from "./components/Filters";
import CampaignTable from "./components/CampaignTable";
import Charts from "./components/Charts";

import { getCampaigns, getKPI } from "../../services/facebookService";

const FacebookDashboard = () => {
    const [filters, setFilters] = useState({});

    const handleFilterChange = (newFilter) => {
        setFilters((prev) => {
            const updated = { ...prev, ...newFilter };

            Object.keys(updated).forEach((key) => {
                if (
                    updated[key] === null ||
                    updated[key] === undefined ||
                    updated[key] === "" ||
                    (Array.isArray(updated[key]) && updated[key].length === 0)
                ) {
                    delete updated[key];
                }
            });

            return { ...updated };
        });
    };

    const {
        data: campaigns = [],
        isLoading: campaignsLoading,
        isFetching: campaignsFetching,
        error: campaignsError,
    } = useQuery({
        queryKey: ["campaigns", JSON.stringify(filters)],
        queryFn: () => getCampaigns(filters),
    });

    const {
        data: kpi = {},
        isLoading: kpiLoading,
        isFetching: kpiFetching,
        error: kpiError,
    } = useQuery({
        queryKey: ["kpi", JSON.stringify(filters)],
        queryFn: () => getKPI(filters),
    });

    const loading = campaignsLoading || kpiLoading;
    const fetching = campaignsFetching || kpiFetching;

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
                filters={filters}
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

                    {campaigns.length > 0 ? (
                        <Charts campaigns={campaigns} loading={loading} />
                    ) : null}

                    <CampaignTable
                        campaigns={campaigns || []}
                        loading={loading}
                    />
                </>
            )}
        </div>
    );
};

export default FacebookDashboard;