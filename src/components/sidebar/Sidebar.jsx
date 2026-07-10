import { sidebarSectionsData } from "./sidebarData";
import { useSidebar } from "../../context/SidebarContext.jsx";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  const { sidebarOpen, closeSidebar } = useSidebar();

  return (
    <>
      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed top-16 right-0 z-50
          h-[calc(100vh-56px)] w-72
          bg-white border-l border-l-blue-100
          overflow-y-auto
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          md:sticky md:top-16 md:translate-x-0
          md:h-[calc(100vh-56px)]
          md:w-72
          md:shrink-0
        `}
      >
        <div className="px-2 py-3">
          {sidebarSectionsData.map((section, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 border-b border-b-blue-100 py-2"
            >
              {section.title && (
                <h3 className="px-4 mb-2 text-xs text-gray-500 font-semibold">
                  {section.title}
                </h3>
              )}

              <div className="flex flex-col gap-1">
                {section.items.map((item, index) => (
                  <NavLink
                    to={item.path}
                    key={index}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-5 px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:bg-blue-50 ${
                        isActive ? "bg-blue-200 font-medium" : ""
                      }`
                    }
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-lg w-5 text-blue-950"
                    />
                    <span className="w-3/4 truncate text-blue-950">
                      {item.title}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
