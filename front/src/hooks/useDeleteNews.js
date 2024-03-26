import { useState } from 'react';
import axios from 'axios';

function useDeleteNews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const deleteNews = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${backendUrl}/news/delete/${id}`);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { deleteNews, loading, error };
}

export default useDeleteNews;
