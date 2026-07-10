import { usePosts } from "../context/PostsContext";
import PostCard from "../components/post/PostCard";

export default function Home() {
  const { posts } = usePosts();

  return (
    <div className="flex justify-between gap-6 xl:gap-8">
      {/* feed */}
      <div className="flex-5 w-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
