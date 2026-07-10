import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Trending from "../components/widgets/Trending";
import Suggestions from "../components/widgets/Suggestions";

export default function MainLayout({ children }) {
  return (
    <div className="2xl:max-w-475 h-screen flex flex-col mx-auto relative">
      <Header />

      <div className="flex flex-row flex-1 pt-14 w-full gap-2 relative">
        <Sidebar />
        <main className="py-10 px-4  w-full md:flex-5 xl:flex-4">{children}</main>
        {/* sidebar widgets */}
        <div className="hidden lg:block flex-2 xl:flex-1">
          <div className="flex flex-col gap-4 sticky top-24 left-5.5 w-[85%]">
            <Trending />
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  );
}
