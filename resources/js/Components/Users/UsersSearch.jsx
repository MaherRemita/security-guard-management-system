import { useState, useEffect } from 'react';
import { Input, Select, Button } from 'antd';
import { SearchOutlined, TeamOutlined } from '@ant-design/icons';
import UserPairsModal from './UserPairsModal';

export default function UsersSearch({ onSearch, onFilterChange, filters }) {
    const [isPairsModalOpen, setIsPairsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(filters.search || '');

    useEffect(() => {
        // Debounce: wait 500ms after user stops typing
        const debounceTimer = setTimeout(() => {
            onSearch(searchValue);
        }, 300);

        // Cleanup: cancel the timer if searchValue changes before 500ms
        return () => clearTimeout(debounceTimer);
    }, [searchValue]);

    const showPairsModal = () => {
        setIsPairsModalOpen(true);
    };

    const handleClosePairsModal = () => {
        setIsPairsModalOpen(false);
    };

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Search Users
                        </label>
                        <Input
                            placeholder="Search by name or email..."
                            allowClear
                            size="large"
                            prefix={<SearchOutlined />}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    {/* User Type Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Filter by User Type
                        </label>
                        <Select
                            placeholder="All Users"
                            size="large"
                            allowClear
                            className="w-full"
                            onChange={onFilterChange}
                            defaultValue={filters.user_type}
                        >
                            <Select.Option value="CUSTOMER">Customers</Select.Option>
                            <Select.Option value="GUARD">Security Guards</Select.Option>
                        </Select>
                    </div>

                    {/* Find Pairs Button */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Age Analysis
                        </label>
                        <Button
                            type="default"
                            size="large"
                            icon={<TeamOutlined />}
                            onClick={showPairsModal}
                            className="w-full"
                        >
                            Find User Pairs by Age
                        </Button>
                    </div>
                </div>
            </div>

            {/* User Pairs Modal */}
            <UserPairsModal
                open={isPairsModalOpen}
                onClose={handleClosePairsModal}
            />
        </>
    );
}
