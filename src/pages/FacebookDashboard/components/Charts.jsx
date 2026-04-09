import { Card, Empty, Spin } from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import { useMemo } from "react";

const Charts = ({ campaigns = [], loading }) => {

    const groupedData = useMemo(() => {
        if (!Array.isArray(campaigns)) return [];

        const grouped = campaigns.reduce((acc, item) => {
            const key = item.accountName || "Unknown";

            if (!acc[key]) {
                acc[key] = {
                    name: key,
                    spend: 0,
                    clicks: 0,
                    impressions: 0,
                };
            }

            acc[key].spend += Number(item.spend || 0);
            acc[key].clicks += Number(item.clicks || 0);
            acc[key].impressions += Number(item.impressions || 0);

            return acc;
        }, {});

        return Object.values(grouped);
    }, [campaigns]);

    const spendData = useMemo(() => {
        return [...groupedData].sort((a, b) => b.spend - a.spend);
    }, [groupedData]);

    const impressionData = useMemo(() => {
        return [...groupedData].sort((a, b) => b.impressions - a.impressions);
    }, [groupedData]);

    const hasData = groupedData && groupedData.length > 0;

    return (
        <>
            {/* Spend Trend */}
            <Card title="Spend Trend" className="mb-4">
                <Spin spinning={loading}>
                    {hasData ? (
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                data={spendData}
                                margin={{ top: 20, right: 30, left: 40, bottom: 80 }}
                            >
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12 }}
                                    interval={0}
                                    angle={-20}
                                    textAnchor="end"
                                />
                                <YAxis />
                                <Tooltip formatter={(value) => `₹${value}`} />
                                <Line
                                    type="monotone"
                                    dataKey="spend"
                                    stroke="#1677ff"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <Empty description="No data available" />
                    )}
                </Spin>
            </Card>

            {/* Impressions */}
            <Card title="Impressions Comparison" className="mb-4">
                <Spin spinning={loading}>
                    {hasData ? (
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={impressionData}
                                margin={{ top: 20, right: 30, left: 40, bottom: 80 }}
                            >
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12 }}
                                    interval={0}
                                    angle={-20}
                                    textAnchor="end"
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="impressions" fill="#1677ff" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <Empty description="No data available" />
                    )}
                </Spin>
            </Card>
        </>
    );
};

export default Charts;