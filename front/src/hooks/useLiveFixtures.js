import { useState, useEffect } from 'react';
import axios from 'axios';

const useLiveFixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/footballapi/direct');
        setFixtures(response.data.response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFixtures();

    return () => {
    };
  }, []);
  return { fixtures, loading, error };
};

export default useLiveFixtures;
