"use client";

import Image from "next/image";
import Color from "../../const/color";

export default function UploadButton({
  text,
  className = "",
  onClick = () => {},
  iconUrl = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[4px] px-3 py-2 ${className} text-[16px] flex items-center gap-2`}
      style={{ backgroundColor: Color.primary, color: Color.lightGreen }}
    >
      <Image src={iconUrl} alt="icon" width={22} height={22} />
      {text}
    </button>
  );
}
