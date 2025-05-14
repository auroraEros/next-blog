"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PostsResults from "@/app/_components/PostsResults";
import SearchSidebar from "@/app/_components/SearchSidebar";

function Page() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("/api/post/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limit: 9,
          order: sortFromUrl || "desc",
          category: categoryFromUrl || "uncategorized",
          searchTerm: searchTermFromUrl || "",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setShowMore(data.posts.length >= 9);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [searchParams]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prev) => ({
      ...prev,
      [id]: value || (id === "sort" ? "desc" : "uncategorized"),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    router.push(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const res = await fetch("/api/post/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        limit: 9,
        ...sidebarData,
        startIndex,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setShowMore(data.posts.length === 9);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <SearchSidebar
        sidebarData={sidebarData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <PostsResults
        loading={loading}
        posts={posts}
        showMore={showMore}
        handleShowMore={handleShowMore}
      />
    </div>
  );
}

export default Page;
