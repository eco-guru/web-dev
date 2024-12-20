import Label from "../label/label";

export default function InputSelect({
  options,
  id,
  label,
  onChange,
  disabled = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="shrink-0 text-xl font-bold" text={label} id={id} />
      <select
        disabled={disabled}
        name={id}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-4 rounded-[4px] text-[16px] border "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
