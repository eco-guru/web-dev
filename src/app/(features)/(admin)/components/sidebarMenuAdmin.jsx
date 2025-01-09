"use client";

import { usePathname, useRouter } from "next/navigation";
import SidebarItemAdmin from "./sidebarItemAdmin";
import DataConfigurationSidebarMenu from "./dataConfigurationSidebarMenu";
import ContentManagementSidebarMenu from "./contentManagementSidebarMenu";
import { useState, useEffect } from "react";
import DashboardSidebarMenu from "./dashboardSidebarMenu";

export default function SidebarMenuAdmin({}) {
  const pathtName = usePathname();
  const [userStatus, setUserStatus] = useState();
  const router = useRouter();
      
  const checkUser = async () => {
    const response = await fetch('/api/checkUser/auth', { method: "GET" });
    const authentication = await response.json();
      
    if(!authentication.login) {
      return router.push('/signin');
    } else {
      setUserStatus(authentication.user);
    }
  }
        
  useEffect(() => {
    const checkMiddleware = () => {
      if(!userStatus) {
        checkUser();
      }
    }
    checkMiddleware();
  }, [userStatus]);

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
      <div className="flex flex-col justify-between h-full overflow-y-scroll" style={{ overflowY: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <ul className="flex flex-col gap-4">
          {
            (userStatus === "admin" || userStatus === 'educator')
              && <li>
                  <DashboardSidebarMenu
                    iconUrl={isActive("/dashboard")
                      ? "/img/admin/home-dark.svg"
                      : "/img/admin/home.svg"
                    }
                    isActive={isActive('/dashboard')}
                  />
                </li>
          }
          {
            (userStatus === "admin" || userStatus === "wastecoll") 
              && <li>
                <DataConfigurationSidebarMenu
                  iconUrl={
                    isActive("/data-master")
                      ? "/img/admin/config-dark.svg"
                      : "/img/admin/config.svg"
                  }
                  isActive={isActive("/data-master")}
                  userStatus={userStatus}
                />
              </li>
          }
          {
            (userStatus === "wastecoll")
              && <li>
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
          }
          {
            (userStatus === "admin" || userStatus === "educator")
             && <li>
              <ContentManagementSidebarMenu
                iconUrl={
                  isActive("/content-management")
                    ? "/img/admin/content-management-dark.svg"
                    : "/img/admin/content-management.svg"
                }
                isActive={isActive("/content-management")}
              />
            </li>
          }
          {
            userStatus === "wastecoll"
             && <li>
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
          }
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
