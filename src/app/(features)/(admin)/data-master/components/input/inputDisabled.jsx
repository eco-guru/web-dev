import Label from "@/app/(features)/(admin)/data-master/components/label";

export default function InputDisabled({
  label,
  value
}) {
  return (
    <div className="flex gap-[80px] justify-between items-center">
      <Label className="shrink-0" text={label}/>
      <input
        readOnly={true}
        type="text"
        value={value}
        className={`w-[70%] outline-none border border-black rounded-lg py-3 px-4 text-xl font-bold`}
      />
    </div>
  );
}
