import { Theme } from "../../../shared/theme.js";

import { MdSpaceDashboard } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { PiGearFineFill } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";

export default function AdminNavbar() {
  return (
    <nav
      className="min-h-screen w-[350px] rounded-tr-2xl rounded-br-2xl text-white px-6 py-16 flex flex-col justify-between"
      style={{ backgroundColor: `${Theme.colors.primary}` }}
    >
      <div className="">
        <h1 className={`text-4xl font-extrabold tracking-widest	mb-32`}>
          BANK <br /> SAMPAH
        </h1>
        <ul className="flex flex-col gap-3">
          <li className="px-5 py-2 rounded-3xl cursor-pointer hover:text-[#276561] hover:bg-green-200">
            <div className="flex items-center gap-3">
              <MdSpaceDashboard className="w-9 h-9" />
              <span className="text-2xl font-bold">Dashboard</span>
            </div>
          </li>
          <li className="px-5 py-2 rounded-3xl cursor-pointer hover:text-[#276561] hover:bg-green-200">
            <div className="flex items-center gap-3">
              <FaUsersCog className="w-9 h-9" />
              <span className="text-2xl font-bold">User Management</span>
            </div>
          </li>
        </ul>
      </div>
      <ul className="flex flex-col gap-3">
        <li className="px-5 py-2 rounded-3xl cursor-pointer hover:text-[#276561] hover:bg-green-200">
          <div className="flex items-center gap-3">
            <PiGearFineFill className="w-9 h-9" />
            <span className="text-2xl font-bold">Pengaturan</span>
          </div>
        </li>
        <li className="px-5 py-2 rounded-3xl cursor-pointer hover:text-[#276561] hover:bg-green-200">
          <div className="flex items-center gap-3">
            <HiOutlineLogout className="w-9 h-9" />
            <span className="text-2xl font-bold">Logout</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}
