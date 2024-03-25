import { useState, useEffect } from 'react';
import axios from 'axios';

function useGetNewsById(id) {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsById = async () => {
      try {
        const response = await axios.get(`https://sportsyncserver-git-main-mouhamadousoumares-projects.vercel.app//news/${id}`);
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsById();
    }
  }, [id]);

  return { news, loading, error };
}

export default useGetNewsById;
