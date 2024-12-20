"use client";

import { usePathname } from "next/navigation";
import SidebarItemAdmin from "./sidebarItemAdmin";

export default function DataConfigurationSidebarMenu({
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
        text={"Konfigurasi Data"}
        iconUrl={iconUrl}
        isDropdown={true}
        isActive={isActive}
      />
      <div className="flex flex-col gap-1 ps-[49px] pe-[24px]">
        <SidebarItemAdmin
          href={"/data-master/waste-category"}
          text={"Kategori Sampah"}
          isActive={isSubmenuIsActive("/data-master/waste-category")}
        />
        <SidebarItemAdmin
          href={"/data-master/waste-type"}
          text={"Jenis Sampah"}
          isActive={isSubmenuIsActive("/data-master/waste-type")}
        />
        <SidebarItemAdmin
          href={"/data-master/unit-of-measurement"}
          text={"Unit Pengukuran"}
          isActive={isSubmenuIsActive("/data-master/unit-of-measurement")}
        />
        <SidebarItemAdmin
          href={"/data-master/waste-price"}
          text={"Harga Sampah"}
          isActive={isSubmenuIsActive("/data-master/waste-price")}
        />
      </div>
    </div>
  );
}
