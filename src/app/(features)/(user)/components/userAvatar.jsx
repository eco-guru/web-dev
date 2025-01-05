import Image from "next/image";

export default function UserAvatar({
  width = 56,
  height = 56,
  src,
}) {
  console.log(src);
  return (
    <img
      className="rounded-full object-cover"
      src={src}
      alt="User Avatar"
      width={width}
      height={height}
      style={{ width: width, height: height }}
    />
  );
}
