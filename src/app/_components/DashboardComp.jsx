"use client";
import { useUser } from "@clerk/nextjs";
import { useDashboardData } from "@/app/_hooks/useDashboardData";
import StatCard from "@/app/_components/StatCard";
import RecentTable from "@/app/_components/RecentTable";
import { HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import LoadingSpinner from "@/app/_components/LoadingSpinner";

export default function DashboardComp() {
  const { user } = useUser();
  const {
    users,
    posts,
    totalUsers,
    totalPosts,
    lastMonthUsers,
    lastMonthPosts,
    loading,
    error,
  } = useDashboardData();

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">You are not an admin!</h1>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={HiOutlineUserGroup}
          lastMonthValue={lastMonthUsers}
          iconColor="bg-teal-600"
        />
        <StatCard
          title="Total Posts"
          value={totalPosts}
          icon={HiDocumentText}
          lastMonthValue={lastMonthPosts}
          iconColor="bg-lime-600"
        />
      </div>

      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <RecentTable
          title="Recent users"
          data={users}
          seeAllLink="/dashboard?tab=users"
          columns={[
            {
              key: "profilePicture",
              label: "User image",
              render: (user) => (
                <img
                  src={user.profilePicture}
                  alt="user"
                  className="w-10 h-10 rounded-full bg-gray-500"
                />
              ),
            },
            { key: "username", label: "Username" },
          ]}
        />

        <RecentTable
          title="Recent posts"
          data={posts}
          seeAllLink="/dashboard?tab=posts"
          columns={[
            {
              key: "image",
              label: "Post image",
              render: (post) => (
                <img
                  src={post.image}
                  alt="post"
                  className="w-14 h-10 rounded-md bg-gray-500"
                />
              ),
            },
            { key: "title", label: "Post Title", className: "w-96" },
            { key: "category", label: "Category", className: "w-5" },
          ]}
        />
      </div>
    </div>
  );
}
