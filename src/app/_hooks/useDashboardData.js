"use client";
import { useState, useEffect } from "react";

export function useDashboardData() {
  const [stats, setStats] = useState({
    users: [],
    posts: [],
    totalUsers: 0,
    totalPosts: 0,
    lastMonthUsers: 0,
    lastMonthPosts: 0,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      const [usersRes, postsRes] = await Promise.all([
        fetch("/api/user/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ limit: 5 }),
        }),
        fetch("/api/post/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ limit: 5 }),
        }),
      ]);

      const usersData = await usersRes.json();
      const postsData = await postsRes.json();

      setStats({
        users: usersData.users || [],
        posts: postsData.posts || [],
        totalUsers: usersData.totalUsers || 0,
        totalPosts: postsData.totalPosts || 0,
        lastMonthUsers: usersData.lastMonthUsers || 0,
        lastMonthPosts: postsData.lastMonthPosts || 0,
        loading: false,
        error: null,
      });
    } catch (error) {
      setStats((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...stats, refetch: fetchData };
}
