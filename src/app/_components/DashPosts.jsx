"use client";
import { useUser } from "@clerk/nextjs";
import usePosts from "@/app/_hooks/usePosts";
import PostsTable from "@/app/_components/PostsTable";
import DeleteConfirmationModal from "@/app/_components/DeleteConfirmationModal";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "flowbite-react";
import Link from "next/link";
import NoPostYet from "./NoPostYet";

export default function DashPosts() {
  const { user } = useUser();

  const [deleting, setDeleting] = useState(false);
  const {
    posts: userPosts,
    loading,
    error,
    fetchPosts,
  } = usePosts(user?.publicMetadata?.userMongoId);

  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const handleDeletePost = async () => {
    setDeleting(true);
    setShowModal(false);
    try {
      const res = await fetch("/api/post/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: postIdToDelete,
          userId: user?.publicMetadata?.userMongoId,
        }),
      });

      if (res.ok) {
        await fetchPosts();
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">You are not an admin!</h1>
      </div>
    );
  }

  if (loading) return <LoadingSpinner size={40} />;
  if (error) return <div>Error: {error}</div>;

  if (userPosts.length > 0)
    return (
      <div className="py-6 space-y-6 flex flex-col mx-auto">
        <Link href="/dashboard/create-post" className="self-end">
          <Button gradientDuoTone="purpleToBlue" outline>
            Create Post
          </Button>
        </Link>

        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          <div>
            <PostsTable
              posts={userPosts}
              onDeleteClick={(id) => {
                setPostIdToDelete(id);
                setShowModal(true);
              }}
            />
            <DeleteConfirmationModal
              show={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={handleDeletePost}
              isLoading={deleting}
            />
          </div>
        </div>
      </div>
    );
  else return <NoPostYet />;
}
