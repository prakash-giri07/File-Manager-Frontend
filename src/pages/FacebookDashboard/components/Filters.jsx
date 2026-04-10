import { Row, Col, DatePicker, Select, Button } from "antd";
import { useMemo } from "react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const Filters = ({ onFilterChange, campaigns = [], filters = {} }) => {


    const getRangePresets = () => [
        { label: "Today", value: [dayjs(), dayjs()] },
        { label: "Yesterday", value: [dayjs().subtract(1, "day"), dayjs().subtract(1, "day")] },
        { label: "Last 7 Days", value: [dayjs().subtract(7, "day"), dayjs()] },
        { label: "Last 14 Days", value: [dayjs().subtract(14, "day"), dayjs()] },
        { label: "Last 30 Days", value: [dayjs().subtract(30, "day"), dayjs()] },
        { label: "Last 60 Days", value: [dayjs().subtract(60, "day"), dayjs()] },
        { label: "Last 90 Days", value: [dayjs().subtract(90, "day"), dayjs()] },
    ];
    const presets = useMemo(() => getRangePresets(), []);

    const campaignOptions = useMemo(() => {
        if (!Array.isArray(campaigns)) return [];

        const unique = [
            ...new Set(campaigns.map((c) => c.name).filter(Boolean)),
        ];

        return unique.map((name) => ({
            value: name,
            label: name,
        }));
    }, [campaigns]);

    const accountOptions = useMemo(() => {
        if (!Array.isArray(campaigns)) return [];

        const unique = [
            ...new Set(campaigns.map((c) => c.accountName).filter(Boolean)),
        ];

        return unique.map((name) => ({
            value: name,
            label: name,
        }));
    }, [campaigns]);

    const handleReset = () => {
        onFilterChange({
            startDate: null,
            endDate: null,
            account: null,
            campaign: null,
        });
    };

    return (
        <Row gutter={16} className="mb-4">

            <Col>
                <Select
                    mode="multiple"
                    placeholder="Select Account"
                    style={{ width: 260 }}
                    allowClear
                    showSearch
                    value={filters.account || []}
                    onChange={(value) => {
                        onFilterChange({
                            account: value?.length ? value : null,
                        });
                    }}
                    options={accountOptions}
                />
            </Col>

            <Col>
                <Select
                    mode="multiple"
                    placeholder="Select Campaign"
                    style={{ width: 260 }}
                    allowClear
                    showSearch
                    value={filters.campaign || []}
                    onChange={(value) => {
                        onFilterChange({
                            campaign: value?.length ? value : null,
                        });
                    }}
                    options={campaignOptions}
                />
            </Col>

            <Col>
                <RangePicker
                    format="YYYY-MM-DD"
                    presets={presets}
                    value={
                        filters.startDate && filters.endDate
                            ? [dayjs(filters.startDate), dayjs(filters.endDate)]
                            : null
                    }
                    onChange={(dates) => {
                        if (!dates) {
                            handleReset();
                            return;
                        }

                        onFilterChange({
                            startDate: dates[0].format("YYYY-MM-DD"),
                            endDate: dates[1].format("YYYY-MM-DD"),
                        });
                    }}
                />
            </Col>

            <Col>
                <Button
                    type="default"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </Col>

        </Row>
    );
};

export default Filters;