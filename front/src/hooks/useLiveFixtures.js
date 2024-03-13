import { useState, useEffect } from 'react';
import axios from 'axios';

const useLiveMatches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchLiveMatches = async () => {
            try {
                const response = await axios.get('http://localhost:3000/live-matches');
                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching live matches:', error);
            }
        };

        fetchLiveMatches();
    }, []);

    return matches;
};

export default useLiveMatches;
