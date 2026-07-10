import { useNavigate, Link } from "react-router-dom";
import { Users } from "../../data/users";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const user = Users.find((u) => u.id === post.userId);

  const goToPost = () => {
    navigate(`/post/${post.id}`);
  };
  return (
    <div
      onClick={goToPost}
      className="bg-white flex flex-col md:flex-row-reverse rounded-lg p-4 shadow-md mb-7 gap-2 md:gap-5 w-full cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="w-full md:w-1/2">
        <div className="flex items-center gap-3">
          <Link
            to={`/profile/${user.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full xl:w-14 xl:h-14 object-cover"
            />
          </Link>

          <div className="w-[75%]">
            <Link
              to={`/profile/${user.name}`}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold truncate w-[90%]"
            >
              {user.name}
            </Link>

            <div className="text-sm text-gray-500 truncate w-[90%] text-[12px]">
              {post.time}
            </div>
          </div>
        </div>

        <p className="mt-3 line-clamp-1 w-full text-[13px] xl:text-[15px] text-gray-800 md:line-clamp-2 leading-[1.8]">
          {post.text}
        </p>
      </div>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="mt-3 md:mt-0 w-full md:w-1/2 aspect-video object-cover rounded-lg"
        />
      )}
    </div>
  );
}
