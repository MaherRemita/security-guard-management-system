import { useState } from 'react';
import axios from 'axios';

export default function useUserPairs() {
    const [pairs, setPairs] = useState([]);
    const [pairsCount, setPairsCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPairs = async (sum) => {
        if (!sum || sum <= 0) {
            setPairs([]);
            setPairsCount(0);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/user-pairs/${sum}`);
            setPairs(response.data.pairs || []);
            setPairsCount(response.data.pairs_count || 0);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch user pairs');
            setPairs([]);
            setPairsCount(0);
        } finally {
            setLoading(false);
        }
    };

    const resetPairs = () => {
        setPairs([]);
        setPairsCount(0);
        setError(null);
    };

    return {
        pairs,
        pairsCount,
        loading,
        error,
        fetchPairs,
        resetPairs,
    };
}
