import Link from "next/link";
import { Button } from "flowbite-react";
import CallToAction from "@/app/_components/CallToAction";
import RecentPosts from "@/app/_components/RecentPosts";

export async function generateMetadata({ params }) {
  const { slug } = params;
  try {
    const result = await fetch(`${process.env.URL}/api/post/get`, {
      method: "POST",
      body: JSON.stringify({ slug }),
    });
    const data = await result.json();
    const post = JSON.parse(JSON.stringify(data.posts?.[0] || {}));
    return {
      title: `${post.title || "Post"} | Sahar-Blog`,
      description: post.content?.substring(0, 100) || "Blog post on Sahar-Blog",
    };
  } catch (error) {
    return {
      title: "Post | Sahar-Blog",
      description: "Blog post on Sahar-Blog",
    };
  }
}

async function Page({ params }) {
  const { slug } = params;
  let post = null;

  try {
    const result = await fetch(`${process.env.URL}/api/post/get`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      cache: "no-store",
    });
    const data = await result.json();
    post = JSON.parse(JSON.stringify(data.posts?.[0]));
  } catch (error) {
    post = { title: "Failed to load post" };
  }

  if (!post || post.title === "Failed to load post") {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Post not found
        </h2>
      </main>
    );
  }

  const postContent = {
    __html: post?.content || "",
  };

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        href={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={postContent}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <RecentPosts limit={3} />
    </main>
  );
}

export default Page;
