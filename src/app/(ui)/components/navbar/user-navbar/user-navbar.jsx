'use client'

import Link from "next/link";
import { Theme } from "../../../shared/theme.js";
import Image from "next/image.js";
import { useSearchParams } from "next/navigation";

export default function UserNavbar() {

  const token = useSearchParams().get("token");

  return (
    <nav
      className="fixed top-0 left-0 right-0 px-11 py-7 text-white"
      style={{ backgroundColor: Theme.colors.primary }}
    >
      <ul className="flex justify-between items-center w-full">
        <li>
          <h1 className={`text-4xl font-extrabold tracking-widest	`}>
            BANK <br /> SAMPAH
          </h1>
        </li>
        <li>
          <div className="flex justify-center gap-8  font-bold text-2xl">
            <Link href={`/home/kategori-sampah?token=${token}`}>Home</Link>
            <Link href={"#"}>My Warehouse</Link>
            <Link href={"#"}>Orders</Link>
            <Link href={"#"}>Shop</Link>
          </div>
        </li>
        <li className="mr-10">
          <Image
            className="inline-block rounded-full ring-2 ring-white"
            width={60}
            height={60}
            src="/img/avatar.webp"
            alt=""
          />
        </li>
      </ul>
    </nav>
  );
}
