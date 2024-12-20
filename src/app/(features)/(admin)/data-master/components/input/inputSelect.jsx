import Label from "../label";

export default function InputSelect({
  options,
  id,
  label,
  onChange,
  disabled = false,
}) {
  return (
    <div className="flex justify-between items-center">
      <Label className="shrink-0" text={label} id={id} />
      <select
        disabled={disabled}
        name={id}
        id={id}
        onChange={(e) => onChange(e.target.value)} // Call onChange with selected value
        className="w-[70%] outline-none border border-black bg-white rounded-lg py-3 px-4 text-xl font-bold"
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
