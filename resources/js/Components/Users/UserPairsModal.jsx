import { useState, useEffect } from 'react';
import { Modal, InputNumber, Empty, Spin, Alert, Tag } from 'antd';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import useUserPairs from '@/Hooks/useUserPairs';

export default function UserPairsModal({ open, onClose }) {
    const [sum, setSum] = useState(null);
    const { pairs, pairsCount, loading, error, fetchPairs, resetPairs } = useUserPairs();

    useEffect(() => {
        // Debounce: wait 500ms after user stops typing
        const debounceTimer = setTimeout(() => {
            if (sum) {
                fetchPairs(sum);
            } else {
                resetPairs();
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [sum]);

    const handleClose = () => {
        setSum(null);
        resetPairs();
        onClose();
    };

    return (
        <Modal
            title={
                <div className="flex items-center gap-2">
                    <TeamOutlined className="text-blue-500 text-xl" />
                    <span>Find User Pairs by Age Sum</span>
                </div>
            }
            open={open}
            onCancel={handleClose}
            footer={null}
            width={700}
        >
            <div className="py-4">
                {/* Input Section */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Enter Age Sum
                    </label>
                    <InputNumber
                        size="large"
                        placeholder="e.g., 50"
                        className="w-full"
                        min={1}
                        max={150}
                        value={sum}
                        onChange={setSum}
                    />
                    <p className="text-xs text-slate-500 mt-2">
                        Find all pairs of users whose ages add up to this number
                    </p>
                </div>

                {/* Results Section */}
                {sum && (
                    <div>
                        {/* Results Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-base font-semibold text-slate-800">
                                Results
                            </h3>
                            {!loading && pairsCount > 0 && (
                                <Tag color="blue" className="text-sm">
                                    {pairsCount} pair{pairsCount !== 1 ? 's' : ''} found
                                </Tag>
                            )}
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="flex justify-center items-center py-12">
                                <Spin size="large" tip="Searching for pairs..." />
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
                        {!loading && !error && pairsCount === 0 && (
                            <Empty
                                description={
                                    <div>
                                        <p className="text-slate-500">No pairs found</p>
                                        <p className="text-slate-400 text-sm mt-1">
                                            Try a different age sum
                                        </p>
                                    </div>
                                }
                                className="py-8"
                            />
                        )}

                        {/* Pairs List */}
                        {!loading && !error && pairsCount > 0 && (
                            <div className="max-h-96 overflow-y-auto space-y-3">
                                {pairs.map((pair, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            {/* First User */}
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full font-semibold">
                                                    {pair[0].name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800">
                                                        {pair[0].name}
                                                    </p>
                                                    <p className="text-sm text-slate-600">
                                                        Age: <span className="font-semibold">{pair[0].age}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Plus Sign */}
                                            <div className="flex items-center justify-center w-8 h-8 bg-slate-200 rounded-full text-slate-600 font-bold">
                                                +
                                            </div>

                                            {/* Second User */}
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full font-semibold">
                                                    {pair[1].name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800">
                                                        {pair[1].name}
                                                    </p>
                                                    <p className="text-sm text-slate-600">
                                                        Age: <span className="font-semibold">{pair[1].age}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Equals Sum */}
                                            <div className="flex items-center justify-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md font-semibold text-sm">
                                                = {sum}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Help Text */}
                {!sum && (
                    <div className="text-center py-8">
                        <UserOutlined className="text-slate-300 text-4xl mb-3" />
                        <p className="text-slate-500">
                            Enter an age sum to find matching user pairs
                        </p>
                    </div>
                )}
            </div>
        </Modal>
    );
}
