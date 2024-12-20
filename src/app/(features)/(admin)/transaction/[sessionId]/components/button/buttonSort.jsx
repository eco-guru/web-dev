import Image from "next/image";

export default function ButtonSort({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-md px-[10px] py-1 border-[2px] border-[#E5E9F1] hover:border-[#E5E9F1] hover:bg-[#E5E9F1] transition-colors"
    >
      <Image
        src={"/img/admin/mi_sort.svg"}
        alt="icon"
        width={20}
        height={20}
        className=""
      />
      {text}
    </button>
  );
}
