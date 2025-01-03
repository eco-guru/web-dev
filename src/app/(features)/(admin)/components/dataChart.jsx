import Image from "next/image";

export default function DataChart({ icon, label, value }) {
  return (
    <div className="border-[3px] min-w-full border-[#E5E9F1] px-2 py-6 rounded-lg col-span-3 2xl:px-4">
      <div className="flex gap-3 items-center 2xl:gap-4">
        <Image src={icon} alt="icon" width={30} height={30} />
        <div className="flex flex-col shrink-0 justify-between">
          <h1 className="font-semibold">{label}</h1>
          <p className="font-bold text-2xl">{value}</p>
        </div>
      </div>
    </div>
  );
}
