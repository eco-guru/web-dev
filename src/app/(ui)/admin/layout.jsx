import AdminNavbar from "../components/navbar/admin-navbar/admin-navbar.jsx";
import Image from "next/image.js";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen text-black">
      <div className="fixed z-50">
        <AdminNavbar />
      </div>
      <div className="w-5/6 px-10">
        <div className="text-end py-5 px-20 bg-green-200 absolute top-0 right-0 left-0">
          <Image
            className="inline-block rounded-full ring-2 ring-white"
            width={60}
            height={60}
            src="/img/avatar.webp"
            alt=""
          />
        </div>
        <div className="w-[calc(100vw-350px)] absolute right-0 top-32 px-12">
          {children}
        </div>
      </div>
    </div>
  );
}
