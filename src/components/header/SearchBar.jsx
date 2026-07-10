import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ placeholder = "جستجو..." }) {
  return (
    <div className="flex w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 border border-blue-900 rounded-r-full px-4 py-2 text-sm focus:outline-none"
      />

      <button className="flex items-center justify-center px-4 border border-r-0 rounded-l-full border-blue-900 bg-blue-100 cursor-pointer">
        <FontAwesomeIcon icon={faSearch} className="text-blue-950"/>
      </button>
    </div>
  );
}
