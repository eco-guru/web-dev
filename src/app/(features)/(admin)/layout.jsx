import SidebarAdmin from "./components/sidebarAdmin";
import TopBarAdmin from "./components/topBarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="">
      <TopBarAdmin />
      <SidebarAdmin className="min-w-[296px]" />
      <div className="w-full px-12 py-[27px] text-black absolute right-0 top-[141px] max-w-[calc(100%-296px)]">
        {children}
      </div>
    </div>
  );
}
