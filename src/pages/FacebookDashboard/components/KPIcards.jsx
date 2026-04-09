import { Card, Row, Col, Skeleton } from "antd";

const KPIcards = ({ kpi = {}, loading }) => {
    const isLoading =
        loading || !kpi || Object.keys(kpi).length === 0;

    // format helpers
    const formatCurrency = (val) =>
        `₹${Number(val || 0).toLocaleString()}`;

    const formatNumber = (val) =>
        Number(val || 0).toLocaleString();

    const formatPercent = (val) =>
        `${Number(val || 0).toFixed(2)}%`;

    return (
        <div className="d-flex w-100">
            <div className="customRow">
                <div className="cardCustom">
                    <Card title="Spend" classNames="w-100">
                        {isLoading ? <Skeleton active paragraph={false} /> : formatCurrency(kpi.spend)}
                    </Card>
                </div>

                <div className="cardCustom">
                    <Card title="Impressions" classNames="w-100">
                        {isLoading ? <Skeleton active paragraph={false} /> : formatNumber(kpi.impressions)}
                    </Card>
                </div>

                <div className="cardCustom">
                    <Card title="Clicks" classNames="w-100">
                        {isLoading ? <Skeleton active paragraph={false} /> : formatNumber(kpi.clicks)}
                    </Card>
                </div>

                <div className="cardCustom">
                    <Card title="CTR" classNames="w-100">
                        {isLoading ? <Skeleton active paragraph={false} /> : formatPercent(kpi.ctr)}
                    </Card>
                </div>

                <div className="cardCustom">
                    <Card title="CPC" classNames="w-100">
                        {isLoading ? <Skeleton active paragraph={false} /> : formatCurrency(kpi.cpc)}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default KPIcards;