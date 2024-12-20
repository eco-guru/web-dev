import Image from "next/image";
import Color from "../const/color";
import Link from "next/link";

export default function TopBarAdmin() {
  return (
    <div
      className="h-[141px] w-full fixed z-10 py-[27px] px-[128px] pt-[66px]"
      style={{ backgroundColor: Color.light }}
    >
      <div className="flex gap-3 items-center justify-end">
        <Image src="/img/icons/bell.svg" alt="Logo" width={26} height={26} />
        <Link href="/profile">
          <Image
            src="/img/icons/person.svg"
            alt="Logo"
            width={48}
            height={48}
          />
        </Link>
      </div>
    </div>
  );
}
