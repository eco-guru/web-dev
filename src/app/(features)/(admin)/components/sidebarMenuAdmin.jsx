"use client";

import { usePathname, useRouter } from "next/navigation";
import SidebarItemAdmin from "./sidebarItemAdmin";
import DataConfigurationSidebarMenu from "./dataConfigurationSidebarMenu";
import ContentManagementSidebarMenu from "./contentManagementSidebarMenu";

export default function SidebarMenuAdmin({}) {
  const pathtName = usePathname();
  const router = useRouter();

  const isActive = (path) =>
    pathtName === path || pathtName.startsWith(path + "/");

  const logoutUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      const result = await response.json();
      console.log(result.message); // Handle success message
      router.push("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-4">
          <li>
            <SidebarItemAdmin
              className=""
              href={"/dashboard"}
              text={"Dashboard"}
              iconUrl={
                isActive("/dashboard")
                  ? "/img/admin/home-dark.svg"
                  : "/img/admin/home.svg"
              }
              isActive={isActive("/dashboard")}
            />
          </li>
          <li>
            <DataConfigurationSidebarMenu
              iconUrl={
                isActive("/data-master")
                  ? "/img/admin/config-dark.svg"
                  : "/img/admin/config.svg"
              }
              isActive={isActive("/data-master")}
            />
          </li>
          <li>
            <SidebarItemAdmin
              className=""
              href={"/transaction"}
              text={"Transaksi"}
              iconUrl={
                isActive("/transaction")
                  ? "/img/admin/transaction-dark.svg"
                  : "/img/admin/transaction.svg"
              }
              isActive={isActive("/transaction")}
            />
          </li>
          <li>
            <ContentManagementSidebarMenu
              iconUrl={
                isActive("/content-management")
                  ? "/img/admin/content-management-dark.svg"
                  : "/img/admin/content-management.svg"
              }
              isActive={isActive("/content-management")}
            />
          </li>
          <li>
            <SidebarItemAdmin
              className=""
              href={"/payment-request"}
              text={"Pencairan"}
              iconUrl={
                isActive("/payment-request")
                  ? "/img/admin/money-dark.svg"
                  : "/img/admin/money.svg"
              }
              isActive={isActive("/payment-request")}
            />
          </li>
        </ul>
        <ul className="flex flex-col gap-4 ">
          <li>
            <SidebarItemAdmin
              className=""
              href={""}
              text={"Pengaturan"}
              iconUrl={
                isActive("/setting")
                  ? "/img/admin/setting-dark.svg"
                  : "/img/admin/setting.svg"
              }
              isActive={isActive("/setting")}
            />
          </li>
          <li>
            <SidebarItemAdmin
              className=""
              href={""}
              text={"Keluar"}
              iconUrl={"/img/admin/logout.svg"}
              isActive={isActive("/api/user/logout")}
              onClick={logoutUser}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
