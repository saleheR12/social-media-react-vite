import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useLayout } from "../../context/LayoutContext";
import { useSidebar } from "../../context/SidebarContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header() {
  const { showSidebarToggle } = useLayout();
  const [searchOpen, setSearchOpen] = useState(false);
  const { toggleSidebar } = useSidebar();

  return (
    <header className="2xl:max-w-475 mx-auto fixed top-0 right-0 left-0 h-16 bg-white border-b border-b-blue-100 z-50">
      {searchOpen ? (
        <div className="flex items-center h-full px-3 gap-2">
          <button
            onClick={() => setSearchOpen(false)}
            className="text-gray-600"
          >
            ✕
          </button>

          <SearchBar />
        </div>
      ) : (
        <div className="flex items-center justify-between h-full px-3">
          {/* راست */}
          <div className="flex items-center gap-3">
            {showSidebarToggle && (
              <button
                onClick={toggleSidebar}
                className="text-lg md:hidden cursor-pointer"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}

            <span className="font-bold text-red-600 text-sm sm:text-base">
              شبکه اجتماعی
            </span>
          </div>

          {/* سرچ دسکتاپ */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <SearchBar placeholder="جستجو" />
          </div>

          {/* چپ */}
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSearchOpen(true)}>
              <FontAwesomeIcon icon={faSearch} className="text-blue-950" />
            </button>

            <button className="text-lg">
              <FontAwesomeIcon icon={faBell} className="text-blue-950" />
            </button>

            <Link className="text-lg" to={`/login`}>
              <FontAwesomeIcon icon={faUser} className="text-blue-950" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
