import { useState, useEffect } from 'react';
import axios from 'axios';

function useGetAllNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://sportsyncserver-git-main-mouhamadousoumares-projects.vercel.app/news/list-all');
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchNews();
  };

  return { news, loading, error, refetch };
}

export default useGetAllNews;
