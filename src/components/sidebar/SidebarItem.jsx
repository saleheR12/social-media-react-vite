import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarItem({ item }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-5 px-4 py-3 rounded-xl
     text-sm transition-all duration-200
     hover:bg-gray-100
     ${isActive ? "bg-gray-200 font-medium" : ""}`
      }
    >
      <FontAwesomeIcon icon={item.icon} className="text-lg w-5" />
      <span>{item.title}</span>
    </NavLink>
  );
}
