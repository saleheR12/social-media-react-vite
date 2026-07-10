import { getTrendingPosts } from "../../utils/getTrendingPosts";
import { Users } from "../../data/users";
import { Link } from "react-router-dom";
import { usePosts } from "../../context/PostsContext";

export default function TrendingWidget() {
  const { posts } = usePosts();
  const trending = getTrendingPosts(posts, 4);

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm">
      <h3 className="font-bold mb-4 text-sm">پست‌های داغ</h3>

      {trending.map((post) => {
        const user = Users.find((u) => u.id === post.userId);

        return (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="flex items-center gap-3 mb-4 hover:bg-gray-50 p-2 rounded-lg"
          >
            {/* تصویر کوچک پست */}
            {post.image && (
              <img
                src={post.image}
                alt=""
                className="w-14 aspect-square lg:w-[30%] rounded-md object-cover shrink-0"
              />
            )}

            {/* متن */}
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500">{user.name}</div>
              <div className="text-xs text-gray-400 mt-1">
                ❤️ {post.likes} • 💬 {post.commentsCount}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
