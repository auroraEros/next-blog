"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import UpdatePostForm from "./UpdatePostForm";
import AdminOnly from "./AdminOnly";


export default function UpdatePost() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const pathname = usePathname();
  const postId = pathname.split("/").pop();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/post/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId }),
        });
        const data = await res.json();
        if (res.ok) setFormData(data.posts[0]);
      } catch (error) {
        console.error("Fetch post error:", error.message);
      }
    };

    if (isSignedIn && user?.publicMetadata?.isAdmin) fetchPost();
  }, [postId, user?.publicMetadata?.isAdmin, isSignedIn]);

  if (!isLoaded) return <LoadingSpinner />;

  if (!isSignedIn || !user.publicMetadata.isAdmin) {
    return <AdminOnly />;
  }

  return (
    <UpdatePostForm
      initialData={formData}
      postId={postId}
      userId={user.publicMetadata.userMongoId}
    />
  );
}
