export default function InputCheckbox({ label, id }) {
  return (
    <div className="flex gap-[14px] items-center">
      <input type="checkbox" id={id} className="w-[30px] h-[26px] rounded-md" />
      <label className="text-[24px] font-light" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
