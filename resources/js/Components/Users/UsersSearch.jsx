import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function UsersSearch({ onSearch, onFilterChange, filters }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Input */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Search Users
                    </label>
                    <Search
                        placeholder="Search by name or email..."
                        allowClear
                        size="large"
                        prefix={<SearchOutlined />}
                        onSearch={onSearch}
                        onChange={(e) => {
                            if (e.target.value === '') {
                                onSearch('');
                            }
                        }}
                        defaultValue={filters.search}
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
            </div>
        </div>
    );
}
