import Link from "next/link";
import Color from "../const/color";
import Image from "next/image";
export default function SidebarItemAdmin({
  className = "",
  href,
  text,
  iconUrl = "",
  isActive = false,
  isDropdown = false,
  onClick = () => {},
}) {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`flex items-center gap-4 py-2 px-3 rounded-lg font-bold text-lg ${className}`}
      style={
        isActive
          ? { backgroundColor: Color.lightGreen, color: Color.primary }
          : { backgroundColor: "transparent", color: Color.lightGreen }
      }
    >
      {iconUrl && <Image src={iconUrl} alt="icon" width={24} height={24} />}
      {text}
      {isDropdown && (
        <Image
          src={
            !isActive
              ? "/img/admin/arrow-down.svg"
              : "/img/admin/arrow-down-dark.svg"
          }
          alt="icon"
          width={17}
          height={17}
        />
      )}
    </Link>
  );
}
