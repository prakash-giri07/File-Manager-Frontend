import { Card, Row, Col, Skeleton } from "antd";

const KPIcards = ({ kpi = {}, loading }) => {
    const isLoading =
        loading || !kpi || Object.keys(kpi).length === 0;

    // 🎯 format helpers
    const formatCurrency = (val) =>
        `₹${Number(val || 0).toLocaleString()}`;

    const formatNumber = (val) =>
        Number(val || 0).toLocaleString();

    const formatPercent = (val) =>
        `${Number(val || 0).toFixed(2)}%`;

    return (
        <Row gutter={16} className="mb-4">
            {/* 💰 Spend */}
            <Col span={4}>
                <Card title="Spend">
                    {isLoading ? (
                        <Skeleton active paragraph={false} />
                    ) : (
                        formatCurrency(kpi.spend)
                    )}
                </Card>
            </Col>

            {/* 👁️ Impressions (REAL DATA) */}
            <Col span={4}>
                <Card title="Impressions">
                    {isLoading ? (
                        <Skeleton active paragraph={false} />
                    ) : (
                        formatNumber(kpi.impressions)
                    )}
                </Card>
            </Col>

            {/* 🖱️ Clicks (future-ready) */}
            <Col span={4}>
                <Card title="Clicks">
                    {isLoading ? (
                        <Skeleton active paragraph={false} />
                    ) : (
                        formatNumber(kpi.clicks)
                    )}
                </Card>
            </Col>

            {/* 📊 CTR */}
            <Col span={4}>
                <Card title="CTR">
                    {isLoading ? (
                        <Skeleton active paragraph={false} />
                    ) : (
                        formatPercent(kpi.ctr)
                    )}
                </Card>
            </Col>

            {/* 💸 CPC */}
            <Col span={4}>
                <Card title="CPC">
                    {isLoading ? (
                        <Skeleton active paragraph={false} />
                    ) : (
                        formatCurrency(kpi.cpc)
                    )}
                </Card>
            </Col>
        </Row>
    );
};

export default KPIcards;