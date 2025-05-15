"use client";
import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

function NoPostYet() {
  const [loading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[300px] dark:bg-gray-800 rounded-lg ">
      <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
        You have no posts yet!
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Start by creating your first post
      </p>
      <Link
        href="/dashboard/create-post"
        onClick={handleClick}
        className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity ${
          loading ? "opacity-90" : ""
        }`}
      >
        {loading ? (
          <>
            <ClipLoader color="#ffffff" size={20} className="mr-2" />
            Redirecting...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New Post
          </>
        )}
      </Link>
    </div>
  );
}

export default NoPostYet;