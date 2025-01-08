"use client";

import { usePathname } from "next/navigation";
import SidebarItemAdmin from "./sidebarItemAdmin";

export default function DashboardSidebarMenu({
  isActive = false,
  iconUrl = "",
}) {
  const pathName = usePathname();

  const isSubmenuIsActive = (path) =>
    pathName === path || pathName.startsWith(path + "/");

  return (
    <div className="flex flex-col gap-1">
      <SidebarItemAdmin
        href={""}
        text={"Dashboard"}
        iconUrl={iconUrl}
        isDropdown={true}
        isActive={isActive}
      />
      <div className="flex flex-col gap-1 ps-[49px] pe-[24px]">
          <SidebarItemAdmin
            href={"/dashboard"}
            text={"Sampah"}
            isActive={isSubmenuIsActive("/dashboard") && !isSubmenuIsActive("/dashboard/content")}
          />
          <SidebarItemAdmin
            href={"/dashboard/content"}
            text={"Konten"}
            isActive={isSubmenuIsActive("/dashboard/content")}
          />
      </div>
    </div>
  );
}
