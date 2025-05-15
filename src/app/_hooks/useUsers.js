
'use client';
import { useState, useEffect } from 'react';

export default function useUsers(userMongoId) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    if (!userMongoId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/user/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMongoId }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
      console.error('Users fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userMongoId]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
}