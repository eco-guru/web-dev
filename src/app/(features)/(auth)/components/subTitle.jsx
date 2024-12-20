import Link from "next/link";

export default function SubTitle({ text, href, textLink }) {
  return (
    <p className="text-[24px]">
      {text}{" "}
      <Link href={href} className="font-bold italic text-white">
        {textLink}
      </Link>
    </p>
  );
}
