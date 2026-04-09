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
    const chartData = useMemo(() => {
        if (!Array.isArray(campaigns)) return [];

        return campaigns.map((item) => ({
            name: item.name,
            spend: Number(item.spend || 0),
            clicks: Number(item.clicks || 0),
            impressions: Number(item.impressions || 0),
        }));
    }, [campaigns]);

    const hasData = chartData.length > 0;

    return (
        <>
            {/* 📈 Spend Trend */}
            <Card title="Spend Trend" className="mb-4">
                <Spin spinning={loading}>
                    {hasData ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12 }}
                                    interval={0}
                                    angle={-20}
                                    textAnchor="end"
                                />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => `₹${value}`}
                                />
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

            {/* 📊 Impressions (better than fake clicks) */}
            <Card title="Impressions Comparison" className="mb-4">
                <Spin spinning={loading}>
                    {hasData ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
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