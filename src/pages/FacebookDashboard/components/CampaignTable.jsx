import { Table, Pagination, Spin, Empty } from "antd";
import { useState, useMemo, useEffect } from "react";

const CampaignTable = ({ data = [], loading }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setPage(1);
    }, [data]);

    const paginatedData = useMemo(() => {
        if (!Array.isArray(data)) return [];

        const start = (page - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [data, page, pageSize]);

    const columns = [
        {
            title: "Campaign",
            dataIndex: "campaign",
            key: "campaign",
            ellipsis: true,
        },
        {
            title: "Spend",
            dataIndex: "spend",
            key: "spend",
            align: "center",
            sorter: (a, b) => a.spend - b.spend,
            render: (val) => `₹${Number(val || 0).toLocaleString()}`,
        },
        {
            title: "Clicks",
            dataIndex: "clicks",
            key: "clicks",
            align: "center",
            sorter: (a, b) => a.clicks - b.clicks,
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
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            align: "center",
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
        },
    ];

    return (
        <div className="rounded-lg p-4 shadow-sm bg-white">
            <Spin spinning={loading}>
                <Table
                    size="small"
                    rowKey="id"
                    columns={columns}
                    dataSource={paginatedData}
                    pagination={false}
                    locale={{
                        emptyText: loading ? "Loading..." : <Empty description="No campaign data available" />,
                    }}
                />

                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Pagination
                        current={page}
                        pageSize={pageSize}
                        total={data.length}
                        showSizeChanger
                        showQuickJumper
                        size="small"
                        onChange={(p, s) => {
                            setPage(p);
                            setPageSize(s);
                        }}
                    />

                    <div style={{ fontSize: "13px", color: "#666" }}>
                        {data.length === 0
                            ? "0 records"
                            : `${Math.min(page * pageSize, data.length)} of ${data.length} records`}
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default CampaignTable;