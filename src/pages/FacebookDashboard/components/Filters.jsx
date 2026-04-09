import { Row, Col, DatePicker, Select } from "antd";
import { useMemo } from "react";

const { RangePicker } = DatePicker;

const Filters = ({ onFilterChange, campaigns = [] }) => {
    // Campaign dropdown options
    const campaignOptions = useMemo(() => {
        if (!Array.isArray(campaigns)) return [];

        const unique = [
            ...new Set(campaigns.map((c) => c.name).filter(Boolean)),
        ];

        return unique
            .sort()
            .map((name) => ({
                value: name,
                label: name,
            }));
    }, [campaigns]);

    // Account dropdown options
    const accountOptions = useMemo(() => {
        if (!Array.isArray(campaigns)) return [];

        const unique = [
            ...new Set(campaigns.map((c) => c.accountName).filter(Boolean)),
        ];

        return unique
            .sort()
            .map((name) => ({
                value: name,
                label: name,
            }));
    }, [campaigns]);

    return (
        <Row gutter={16} className="mb-4">
            {/* Date Filter */}
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

            {/* account Filter */}
            <Col>
                <Select
                    placeholder="Select Account"
                    style={{ width: 260 }}
                    allowClear
                    showSearch
                    optionFilterProp="label"
                    onChange={(value) => {
                        onFilterChange({ account: value || null });
                    }}
                    options={accountOptions}
                    notFoundContent="No Accounts"
                />
            </Col>

            {/*Campaign Filter */}
            <Col>
                <Select
                    placeholder="Select Campaign"
                    style={{ width: 260 }}
                    allowClear
                    showSearch
                    optionFilterProp="label"
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