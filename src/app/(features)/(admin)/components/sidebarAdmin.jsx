import Color from "../const/color";
import LogoAdmin from "./logoAdmin";
import SidebarItemAdmin from "./sidebarItemAdmin";
import SidebarMenuAdmin from "./sidebarMenuAdmin";

export default function SidebarAdmin({ className = "" }) {
  return (
    <nav
      className={`px-6 py-16 fixed z-30 left-0 top-0 bottom-0 rounded-e-2xl ${className}`}
      style={{ backgroundColor: Color.primary }}
    >
      <div className="flex flex-col gap-24 h-full">
        <LogoAdmin />

        <SidebarMenuAdmin />
      </div>
    </nav>
  );
}
