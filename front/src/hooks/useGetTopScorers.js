import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetTopScorers = () => {
  const [topScorers, setTopScorers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopScorers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/footballapi/topscorers');
        setTopScorers(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTopScorers();

    return () => {
    };
  }, []);

  return { topScorers, loading, error };
};

export default useGetTopScorers;
