// import React from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { Posts } from "../data/posts";
// import { Users } from "../data/users";

// export default function PostDetailPage() {
//   const { postId } = useParams();
//   const navigate = useNavigate();

//   const post = Posts.find((p) => p.id === Number(postId));
//   if (!post) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20">
//         <p className="text-lg text-gray-600 mb-4">⚠️ پست مورد نظر پیدا نشد</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           بازگشت
//         </button>
//       </div>
//     );
//   }

//   // اطلاعات نویسنده را از users پیدا می‌کنیم
//   const author = Users.find((u) => u.id === post.userId);

//   return (
//     <div className="w-full mx-auto px-6">
//       {/* 🔹 بخش مشخصات پست */}
//       <article className="bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-8">
//         <div className="flex items-center gap-3 mb-4">
//           <img
//             src={author?.avatar || "/assets/images/default-avatar.png"}
//             alt={author?.name || "کاربر"}
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <div>
//             <Link
//               to={`/user/${author?.username || author?.id}`}
//               onClick={(e) => e.stopPropagation()}
//               className="font-semibold hover:underline"
//             >
//               {author?.name || "کاربر ناشناس"}
//             </Link>
//             <p className="text-gray-500 text-sm">{post.time}</p>
//           </div>
//         </div>

//         {post.image && (
//           <img
//             src={post.image}
//             alt="post"
//             className="rounded-lg mb-4 w-full aspect-video object-cover"
//           />
//         )}

//         <p className="text-gray-800 text-lg leading-relaxed mb-4 whitespace-pre-line">
//           {post.text}
//         </p>

//         <div className="flex gap-5 text-gray-600 text-sm mt-3 border-t pt-3">
//           <div>👍 {post.likes}</div>
//           <div>👎 {post.dislikes}</div>
//           <div>💬 {post.commentsCount}</div>
//           <div>👁 {post.views}</div>
//         </div>
//       </article>

//       {/* 🔹 بخش کامنت‌ها */}
//       <section className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">💬 نظرات</h2>
//         {post.commentsCount > 0 ? (
//           <p className="text-gray-600">
//             این پست {post.commentsCount} کامنت دارد (در نسخه ساده فقط نمایش
//             تعداد).
//           </p>
//         ) : (
//           <p className="text-gray-500">هنوز کامنتی ندارد.</p>
//         )}
//       </section>
//     </div>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Posts } from "../data/posts";
import { Users } from "../data/users";
import { Comments as initialComments } from "../data/comments";

export default function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const foundPost = Posts.find((p) => p.id === Number(postId));

  const [post, setPost] = useState(foundPost || null);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(
    initialComments.filter((c) => c.postId === Number(postId)),
  );

  useEffect(() => {
    const currentPost = Posts.find((p) => p.id === Number(postId));
    setPost(currentPost || null);
    setLiked(false);
    setComments(initialComments.filter((c) => c.postId === Number(postId)));
    setNewComment("");
  }, [postId]);

  useEffect(() => {
    setPost((prev) => {
      if (!prev) return prev;
      return { ...prev, views: prev.views + 1 };
    });
  }, [postId]);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-gray-600 mb-4">⚠️ پست مورد نظر پیدا نشد</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          بازگشت
        </button>
      </div>
    );
  }

  const author = Users.find((u) => u.id === post.userId);

  const relatedPosts = useMemo(() => {
    return Posts.filter((p) => p.userId === post.userId && p.id !== post.id);
  }, [post]);

  const handleLike = () => {
    if (liked) {
      setPost((prev) => ({ ...prev, likes: prev.likes - 1 }));
    } else {
      setPost((prev) => ({ ...prev, likes: prev.likes + 1 }));
    }
    setLiked((prev) => !prev);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(),
      postId: post.id,
      userId: 1,
      text: newComment.trim(),
    };

    setComments((prev) => [...prev, commentObj]);
    setPost((prev) => ({ ...prev, commentsCount: prev.commentsCount + 1 }));
    setNewComment("");
  };

  return (
    <div className="w-full mx-auto px-6">
      {/* 🔹 بخش مشخصات پست */}
      <article className="bg-white rounded-lg shadow-md border border-gray-100 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            to={`/profile/${author?.name}`}
            onClick={(e) => e.stopPropagation()}
            className="font-semibold hover:underline"
          >
            <img
              src={author?.avatar || "/assets/images/default-avatar.png"}
              alt={author?.name || "کاربر"}
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>

          <div>
            <Link
              to={`/profile/${author?.name}`}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold hover:underline"
            >
              {author?.name || "کاربر ناشناس"}
            </Link>
            <p className="text-gray-500 text-sm">{post.time}</p>
          </div>
        </div>

        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="rounded-lg mb-4 w-full aspect-video object-cover"
          />
        )}

        <p className="text-gray-800 text-lg leading-relaxed mb-4 whitespace-pre-line">
          {post.text}
        </p>

        <div className="flex flex-wrap gap-5 text-gray-600 text-sm mt-3 border-t pt-3">
          <button
            onClick={handleLike}
            className={`transition font-medium ${
              liked ? "text-blue-600" : "text-gray-600"
            }`}
          >
            👍 {post.likes}
          </button>
          <div>👎 {post.dislikes}</div>
          <div>💬 {post.commentsCount}</div>
          <div>👁 {post.views}</div>
        </div>
      </article>

      {/* 🔹 بخش کامنت‌ها */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-5">💬 نظرات</h2>

        {comments.length > 0 ? (
          <div className="space-y-4 mb-6">
            {comments.map((comment) => {
              const commentUser = Users.find((u) => u.id === comment.userId);

              return (
                <div
                  key={comment.id}
                  className="flex gap-3 border-b border-gray-100 pb-4"
                >
                  <img
                    src={
                      commentUser?.avatar || "/assets/images/default-avatar.png"
                    }
                    alt={commentUser?.name || "user"}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">
                      {commentUser?.name || "کاربر"}
                    </p>
                    <p className="text-gray-700 text-sm mt-1 leading-6">
                      {comment.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">هنوز کامنتی ندارد.</p>
        )}

        {/* فرم افزودن کامنت */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ارسال
          </button>
        </div>
      </section>

      {/* 🔹 بخش پست‌های مرتبط */}
      {relatedPosts.length > 0 && (
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-5">📌 پست‌های مرتبط</h2>

          <div className="space-y-4">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/post/${relatedPost.id}`}
                className="block border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex gap-4 items-center">
                  {relatedPost.image && (
                    <img
                      src={relatedPost.image}
                      alt="related post"
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                  )}

                  <div className="min-w-0">
                    <p className="text-gray-800 font-medium line-clamp-2">
                      {relatedPost.text}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-2">
                      <span>👍 {relatedPost.likes}</span>
                      <span>💬 {relatedPost.commentsCount}</span>
                      <span>👁 {relatedPost.views}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
