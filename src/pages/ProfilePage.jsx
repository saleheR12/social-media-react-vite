import React, { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Users } from "../data/users";
import { Posts } from "../data/posts";

export default function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();

  // 1) پیدا کردن کاربر بر اساس username از URL
  const user = useMemo(() => {
    const u = (username || "").trim().toLowerCase();
    if (!u) return null;

    return (
      Users.find((x) => (x.name || "").trim().toLowerCase() === u) || null
    );
  }, [username]);

  // 2) پست‌های همین کاربر (با userId)
  const userPosts = useMemo(() => {
    if (!user) return [];
    return Posts.filter((p) => Number(p.userId) === Number(user.id));
  }, [user]);

  // 3) آمار ساده از روی پست‌ها
  const stats = useMemo(() => {
    const postsCount = userPosts.length;
    const totalLikes = userPosts.reduce(
      (sum, p) => sum + (Number(p.likes) || 0),
      0
    );
    const totalComments = userPosts.reduce(
      (sum, p) => sum + (Number(p.commentsCount) || 0),
      0
    );
    const totalViews = userPosts.reduce(
      (sum, p) => sum + (Number(p.views) || 0),
      0
    );

    return { postsCount, totalLikes, totalComments, totalViews };
  }, [userPosts]);

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow border p-6">
        <p className="text-gray-700 mb-4">کاربر @{username} پیدا نشد.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          برگشت
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="p-6 -mt-10">
          <div className="flex items-end gap-4">
            <img
              src={user.avatar || "/assets/images/default-avatar.png"}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white"
            />

            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate">
                {user.name}
              </h1>
              <p className="text-gray-500 text-sm truncate">@{user.username}</p>

              {user.bio && (
                <p className="text-gray-700 text-sm mt-2 leading-6 whitespace-pre-line">
                  {user.bio}
                </p>
              )}
            </div>

            {/* اکشن‌ها (نمایشی) */}
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border hover:bg-gray-50">
                پیام
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                دنبال کردن
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatBox label="پست‌ها" value={stats.postsCount} />
            <StatBox label="لایک‌ها" value={stats.totalLikes} />
            <StatBox label="کامنت‌ها" value={stats.totalComments} />
            <StatBox label="بازدید" value={stats.totalViews} />
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-white rounded-lg shadow border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">پست‌های {user.name}</h2>
          <span className="text-sm text-gray-500">{userPosts.length} پست</span>
        </div>

        {userPosts.length === 0 ? (
          <p className="text-gray-500">این کاربر هنوز پستی منتشر نکرده است.</p>
        ) : (
          <div className="space-y-4">
            {userPosts.map((p) => (
              <Link
                key={p.id}
                to={`/post/${p.id}`}
                className="block border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex gap-4 items-center">
                  {p.image && (
                    <img
                      src={p.image}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 font-medium line-clamp-2">
                      {p.text}
                    </p>

                    <div className="flex gap-4 text-xs text-gray-500 mt-2">
                      <span>👍 {p.likes}</span>
                      <span>💬 {p.commentsCount}</span>
                      <span>👁 {p.views}</span>
                      {p.time && <span>🕒 {p.time}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="border border-gray-100 rounded-lg p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}
