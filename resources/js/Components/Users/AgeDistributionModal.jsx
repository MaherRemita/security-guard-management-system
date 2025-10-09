import { useEffect } from 'react';
import { Modal, Empty, Spin, Alert, Progress } from 'antd';
import { BarChartOutlined, UserOutlined } from '@ant-design/icons';
import useAgeDistribution from '@/Hooks/useAgeDistribution';

export default function AgeDistributionModal({ open, onClose }) {
    const { distribution, loading, error, fetchDistribution, resetDistribution } = useAgeDistribution();

    useEffect(() => {
        if (open) {
            fetchDistribution();
        } else {
            resetDistribution();
        }
    }, [open]);

    // Calculate total users for percentage
    const totalUsers = distribution.reduce((sum, item) => sum + item.count, 0);

    // Get color for each age range
    const getColor = (ageRange) => {
        const colors = {
            '15-30': '#3b82f6', // blue
            '31-45': '#10b981', // green
            '46-60': '#f59e0b', // orange
            '61+': '#ef4444',   // red
        };
        return colors[ageRange] || '#6b7280';
    };

    const handleClose = () => {
        resetDistribution();
        onClose();
    };

    return (
        <Modal
            title={
                <div className="flex items-center gap-2">
                    <BarChartOutlined className="text-blue-500 text-xl" />
                    <span>Age Distribution</span>
                </div>
            }
            open={open}
            onCancel={handleClose}
            footer={null}
            width={600}
        >
            <div className="py-4">
                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <Spin size="large" tip="Loading distribution..." />
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                        className="mb-4"
                    />
                )}

                {/* Empty State */}
                {!loading && !error && distribution.length === 0 && (
                    <Empty
                        description={
                            <div>
                                <p className="text-slate-500">No data available</p>
                                <p className="text-slate-400 text-sm mt-1">
                                    No users found in the system
                                </p>
                            </div>
                        }
                        className="py-8"
                    />
                )}

                {/* Distribution Display */}
                {!loading && !error && distribution.length > 0 && (
                    <div className="space-y-6">
                        {/* Total Users */}
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <p className="text-sm text-blue-600 font-medium mb-1">Total Users</p>
                            <p className="text-3xl font-bold text-blue-700">{totalUsers}</p>
                        </div>

                        {/* Age Ranges */}
                        <div className="space-y-4">
                            {distribution.map((item, index) => {
                                const percentage = ((item.count / totalUsers) * 100).toFixed(1);
                                const color = getColor(item.age_range);

                                return (
                                    <div key={index} className="space-y-2">
                                        {/* Range Header */}
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <UserOutlined style={{ color }} />
                                                <span className="font-semibold text-slate-800">
                                                    {item.age_range} years
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-slate-600">
                                                    {item.count} user{item.count !== 1 ? 's' : ''}
                                                </span>
                                                <span className="text-sm font-semibold text-slate-700">
                                                    {percentage}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <Progress
                                            percent={parseFloat(percentage)}
                                            strokeColor={color}
                                            showInfo={false}
                                            strokeWidth={12}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="pt-4 border-t border-slate-200">
                            <p className="text-xs text-slate-500 text-center">
                                Distribution shows the number of users in each age range
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}
