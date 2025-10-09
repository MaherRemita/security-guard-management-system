import { useState } from 'react';
import axios from 'axios';

export default function useAgeDistribution() {
    const [distribution, setDistribution] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDistribution = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('/api/age-distribution');
            setDistribution(response.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch age distribution');
            setDistribution([]);
        } finally {
            setLoading(false);
        }
    };

    const resetDistribution = () => {
        setDistribution([]);
        setError(null);
    };

    return {
        distribution,
        loading,
        error,
        fetchDistribution,
        resetDistribution,
    };
}
