import Link from "next/link";

export default function NavbarItem({ text, href }) {
  return (
    <Link className="text-white font-bold text-[24px]" href={href}>
      {text}
    </Link>
  );
}
