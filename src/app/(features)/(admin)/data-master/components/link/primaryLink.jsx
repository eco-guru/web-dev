"use client";

import Link from "next/link";

export default function PrimaryLink({
  text,
  className = "",
  onClick = () => {},
  href = "",
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-blue-500 underline ${className}`}
    >
      {text}
    </Link>
  );
}
