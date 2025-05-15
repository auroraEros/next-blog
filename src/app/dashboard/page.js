// app/dashboard/page.js
import Dashboard from "@/app/_components/Dashboard";

export async function generateMetadata(props) {
  const searchParams = await props.searchParams;
  const tab = searchParams?.tab || "dash";

  const titles = {
    dash: "Dashboard Overview",
    profile: "User Profile",
    posts: "Manage Posts",
    users: "User Management",
  };

  const descriptions = {
    dash: "Your personal dashboard overview",
    profile: "Manage your profile settings",
    posts: "Create and manage your blog posts",
    users: "Manage system users and permissions",
  };

  return {
    title: titles[tab],
    description: descriptions[tab],
  };
}

export default function Page() {
  return <Dashboard />;
}
