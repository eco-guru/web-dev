"use client";

import { usePathname } from "next/navigation";
import SidebarItemAdmin from "./sidebarItemAdmin";

export default function ContentManagementSidebarMenu({
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
        text={"Kelola Konten"}
        iconUrl={iconUrl}
        isDropdown={true}
        isActive={isActive}
      />
      <div className="flex flex-col gap-1 ps-[49px] pe-[24px]">
        <SidebarItemAdmin
          href={"/content-management/article"}
          text={"Artikel"}
          isActive={isSubmenuIsActive("/content-management/article")}
        />
        <SidebarItemAdmin
          href={"/content-management/video"}
          text={"Video"}
          isActive={isSubmenuIsActive("/content-management/video")}
        />
      </div>
    </div>
  );
}
