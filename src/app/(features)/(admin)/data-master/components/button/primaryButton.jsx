"use client";

import Link from "next/link";
import Color from "../../../const/color";

export default function PrimaryButton({
  text,
  className = "",
  href = "",
  onClick = () => {},
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-white py-3 px-14 rounded-lg font-bold text-xl ${className}`}
      style={{ backgroundColor: Color.primary }}
    >
      {text}
    </Link>
  );
}
