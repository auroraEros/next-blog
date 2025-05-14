"use client";

import PostCard from "./PostCard";


export default function PostsResults({ loading, posts, showMore, handleShowMore }) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
        Posts results:
      </h1>
      <div className="p-7 flex flex-wrap gap-4">
        {!loading && posts.length === 0 && (
          <p className="text-xl text-gray-500">No posts found.</p>
        )}
        {loading && <p className="text-xl text-gray-500">Loading...</p>}
        {!loading &&
          posts.map((post) => <PostCard key={post._id} post={post} />)}
        {showMore && (
          <button
            onClick={handleShowMore}
            className="text-teal-500 text-lg hover:underline p-7 w-full"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}