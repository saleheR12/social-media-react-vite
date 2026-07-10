import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import PostDetailPage from "../pages/PostDetailPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layout/MainLayout.jsx";
import SimpleLayout from "../layout/SimpleLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/post/:postId" element={<PostDetailPage />} />
      </Route>

      <Route
        element={
          <SimpleLayout>
            <Outlet />
          </SimpleLayout>
        }
      >
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
