import LabelInputUserProfile from "../labelInputUserProfile";

export default function InputTextProfile({
  label,
  id,
  value = "",
  onchange = () => {},
}) {
  return (
    <div className="">
      <LabelInputUserProfile text={label} id={id} />
      <input
        type="text"
        id={id}
        value={value}
        className="mt-1 w-full outline-none border border-[#276561] py-[10px] px-6 text-[24px] rounded-lg font-bold"
        onChange={onchange}
      />
    </div>
  );
}
