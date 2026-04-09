import { Table, Pagination, Spin, Empty } from "antd";
import { useState, useMemo, useEffect } from "react";

const CampaignTable = ({ campaigns = [], loading }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setPage(1);
    }, [campaigns]);

    const paginatedData = useMemo(() => {
        if (!Array.isArray(campaigns)) return [];

        const start = (page - 1) * pageSize;
        return campaigns.slice(start, start + pageSize);
    }, [campaigns, page, pageSize]);

    const columns = [
        {
            title: "Account",
            dataIndex: "accountName",
            key: "accountName",
            ellipsis: true,
        },
        {
            title: "Campaign",
            dataIndex: "name",
            key: "name",
            ellipsis: true,
        },
        {
            title: "Spend",
            dataIndex: "spend",
            key: "spend",
            align: "center",
            sorter: (a, b) => (a.spend || 0) - (b.spend || 0),
            render: (val) => `₹${Number(val || 0).toLocaleString()}`,
        },
        {
            title: "Impressions",
            dataIndex: "impressions",
            key: "impressions",
            align: "center",
            sorter: (a, b) => (a.impressions || 0) - (b.impressions || 0),
            render: (val) => Number(val || 0).toLocaleString(),
        },
        {
            title: "Clicks",
            dataIndex: "clicks",
            key: "clicks",
            align: "center",
            sorter: (a, b) => (a.clicks || 0) - (b.clicks || 0),
            render: (val) => Number(val || 0),
        },
        {
            title: "CTR (%)",
            dataIndex: "ctr",
            key: "ctr",
            align: "center",
            render: (val) => Number(val || 0).toFixed(2),
        },
        {
            title: "CPC",
            dataIndex: "cpc",
            key: "cpc",
            align: "center",
            render: (val) => `₹${Number(val || 0).toFixed(2)}`,
        },
    ];

    return (
        <div className="rounded-lg p-4 shadow-sm bg-white text-nowrap">
            <Spin spinning={loading}>
                <Table
                    size="small"
                    rowKey="id"
                    columns={columns}
                    dataSource={paginatedData}
                    pagination={false}
                    locale={{
                        emptyText: loading ? (
                            "Loading..."
                        ) : (
                            <Empty description="No campaign data available" />
                        ),
                    }}
                />

                <div className="mt-3 d-flex align-items-center justify-content-between  w-full flex-nowrap">
                    <div className="inline-flex">
                        <Pagination
                            current={page}
                            pageSize={pageSize}
                            total={campaigns.length}
                            showSizeChanger
                            showQuickJumper
                            size="small"
                            onChange={(p, s) => {
                                setPage(p);
                                setPageSize(s);
                            }}
                        />
                    </div>

                    <div className="ml-auto text-sm text-black whitespace-nowrap">
                        {campaigns.length === 0
                            ? "0 records"
                            : `${Math.min(page * pageSize, campaigns.length)} of ${campaigns.length} records`}
                    </div>

                </div>
            </Spin>
        </div>
    );
};

export default CampaignTable;