"use client";

import Link from "next/link";

export default function DangerLink({
  text,
  className = "",
  onClick = () => {},
  href = "",
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-red-500 underline ${className}`}
    >
      {text}
    </Link>
  );
}
