'use client';
import { useUser } from '@clerk/nextjs';
import useUsers from '@/app/_hooks/useUsers';
import UserTable from '@/app/_components/UserTable';
import LoadingSpinner from '@/app/_components/LoadingSpinner';

export default function DashUsers() {
  const { user, isLoaded } = useUser();
  const { users, loading, error } = useUsers(user?.publicMetadata?.userMongoId);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

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
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar">
      {users.length > 0 ? (
        <UserTable users={users} />
      ) : (
        <p className="p-4 text-gray-500">You have no users yet!</p>
      )}
    </div>
  );
}