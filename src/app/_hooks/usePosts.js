// hooks/usePosts.js
import { useState, useEffect, useCallback } from 'react';

export default function usePosts(userId, initialFilters = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchPosts = useCallback(async (customFilters = {}) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const mergedFilters = { ...filters, ...customFilters };
      const res = await fetch('/api/post/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId,
          ...mergedFilters 
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch posts');
      }

      const data = await res.json();
      setPosts(data.posts);
      return data.posts;
    } catch (err) {
      setError(err.message);
      console.error('Posts fetch error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId, filters]);

  const applyFilters = useCallback(async (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    return fetchPosts(newFilters);
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    filters,
    fetchPosts,
    applyFilters,
    setPosts,
  };
}