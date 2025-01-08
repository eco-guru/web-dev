import Image from "next/image";

export default function DataChart({ icon, label, value, parentStyle, childStyle }) {
  return (
    <div className={`border-[3px] min-w-full border-[#E5E9F1] py-6 ${parentStyle} rounded-lg 2xl:px-4 flex items-center justify-center`}>
      <div className={`flex items-center ${childStyle} w-full h-full`}>
        <Image src={icon} alt="icon" width={30} height={30} />
        <div className="flex flex-col shrink-0 justify-between">
          <h1 className="font-semibold">{label}</h1>
          <p className="font-bold text-2xl">{value}</p>
        </div>
      </div>
    </div>
  );
}
