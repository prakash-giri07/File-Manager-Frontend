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

const Charts = ({ data = [], loading }) => {
    const chartData = useMemo(() => {
        if (!Array.isArray(data)) return [];

        return data.map((item) => ({
            ...item,
            spend: Number(item.spend || 0),
            clicks: Number(item.clicks || 0),
        }));
    }, [data]);

    const hasData = chartData.length > 0;

    return (
        <>
            <Card title="Spend Trend" className="mb-4">
                <Spin spinning={loading}>
                    {hasData ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <XAxis dataKey="campaign" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="spend" stroke="#1677ff" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <Empty description="No data available" />
                    )}
                </Spin>
            </Card>

            <Card title="Clicks Comparison" className="mb-4">
                <Spin spinning={loading}>
                    {hasData ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="campaign" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="clicks" fill="#1677ff" />
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