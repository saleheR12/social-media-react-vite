import SidebarItem from "./SidebarItem";

export default function SidebarSection({ section }) {
  return (
    <div className="border-b pb-3 mb-3">
      {section.title && (
        <h3 className="px-4 mb-2 text-xs text-gray-500 font-semibold">
          {section.title}
        </h3>
      )}

      <div className="flex flex-col gap-1">
        {section.items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
