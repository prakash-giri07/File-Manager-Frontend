import { Row, Col, DatePicker, Select } from "antd";
import { useMemo } from "react";

const { RangePicker } = DatePicker;

const Filters = ({ onFilterChange, campaigns = [] }) => {
    const campaignOptions = useMemo(() => {
        if (!Array.isArray(campaigns)) return [];

        const unique = [...new Set(campaigns.map((c) => c.campaign).filter(Boolean))];

        return unique.map((name) => ({
            value: name,
            label: name,
        }));
    }, [campaigns]);

    return (
        <Row gutter={16} className="mb-4">
            <Col>
                <RangePicker
                    format="YYYY-MM-DD"
                    onChange={(dates, dateStrings) => {
                        if (!dates) {
                            onFilterChange({
                                startDate: null,
                                endDate: null,
                            });
                            return;
                        }

                        onFilterChange({
                            startDate: dateStrings[0],
                            endDate: dateStrings[1],
                        });
                    }}
                />
            </Col>

            <Col>
                <Select
                    placeholder="Select Campaign"
                    style={{ width: 240 }}
                    allowClear
                    showSearch={{
                        filterOption: (input, option) =>
                            option?.label?.toLowerCase().includes(input.toLowerCase()),
                    }}
                    onChange={(value) => {
                        onFilterChange({ campaign: value || null });
                    }}
                    options={campaignOptions}
                    notFoundContent="No campaigns"
                />
            </Col>
        </Row>
    );
};

export default Filters;