import PostCard from "@/app/_components/PostCard";

async function RecentPosts({ limit }) {
  let posts = [];
  try {
    const result = await fetch(process.env.URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ limit: limit, order: "desc" }),
      cache: "no-store",
    });
    if (!result.ok) {
      throw new Error("Response not ok");
    }
    const data = await result.json();
    posts = Array.isArray(data.posts) ? data.posts : [];
  } catch (error) {
    console.log("Error getting post:", error);
  }

  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-xl mt-5">Recent articles</h1>
      <div className="flex flex-wrap gap-5 mt-5 justify-center">
        {posts.map((post) => (
          <PostCard 
            key={`post-${post._id || post.id || post.title}`} 
            post={post} 
          />
        ))}
      </div>
    </div>
  );
}

export default RecentPosts;