import { Card, Row, Col, Skeleton } from "antd";

const KPIcards = ({ data = {}, loading }) => {
    const isLoading = loading || !data || Object.keys(data).length === 0;

    const formatCurrency = (val) => `₹${Number(val || 0).toLocaleString()}`;
    const formatNumber = (val) => Number(val || 0).toLocaleString();
    const formatPercent = (val) => `${Number(val || 0).toFixed(2)}%`;

    return (
        <Row gutter={16} className="mb-4">
            <Col span={6}>
                <Card title="Spend">
                    {isLoading ? (
                        <Skeleton active paragraph={false} />
                    ) : (
                        formatCurrency(data.spend)
                    )}
                </Card>
            </Col>

            <Col span={6}>
                <Card title="Clicks">
                    {isLoading ? (
                        <Skeleton active paragraph={false} />
                    ) : (
                        formatNumber(data.clicks)
                    )}
                </Card>
            </Col>

            <Col span={6}>
                <Card title="CTR">
                    {isLoading ? (
                        <Skeleton active paragraph={false} />
                    ) : (
                        formatPercent(data.ctr)
                    )}
                </Card>
            </Col>

            <Col span={6}>
                <Card title="CPC">
                    {isLoading ? (
                        <Skeleton active paragraph={false} />
                    ) : (
                        formatCurrency(data.cpc)
                    )}
                </Card>
            </Col>
        </Row>
    );
};

export default KPIcards;