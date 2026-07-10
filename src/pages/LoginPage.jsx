// src/pages/AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: اینجا می‌تونی منطق لاگین/ثبت‌نام واقعی رو اضافه کنی
    if (isLogin) {
      // منطق لاگین
    } else {
      // منطق ثبت نام
    }
    console.log(isLogin ? "Login submit" : "Signup submit");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-100 px-4 w-3xl">
      <h1 className="text-blue-800 font-bold text-xl text-center mb-5.5">
        به شبکه اجتماعی ما خوش آمدید
      </h1>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
          {isLogin ? "ورود به حساب کاربری" : "ساخت حساب جدید"}
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          {isLogin
            ? "برای ادامه وارد حساب خود شوید."
            : "برای پیوستن به شبکه اجتماعی ثبت‌نام کنید."}
        </p>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* در حالت ثبت‌نام، فیلد نام کاربری را هم نشان بده */}
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">نام کاربری</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="مثلاً ali_1379"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">ایمیل</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">رمز عبور</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="حداقل ۶ کاراکتر"
              required
            />
          </div>

          {/* دکمه ارسال فرم */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
            onClick={handleSubmit}
          >
            {isLogin ? "ورود" : "ثبت‌نام"}
          </button>
        </form>

        {/* سوییچ بین لاگین و ثبت‌نام */}
        <div className="mt-4 text-center text-sm">
          {isLogin ? "حساب کاربری ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}
          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="ml-1 text-blue-600 font-semibold hover:underline cursor-pointer"
            type="button"
          >
            {isLogin ? "ثبت‌نام کنید" : "وارد شوید"}
          </button>
        </div>

        {/* دکمه بازگشت به صفحه اصلی */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition cursor-pointer"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
}
