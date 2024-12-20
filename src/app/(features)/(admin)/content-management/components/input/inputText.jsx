import Label from "../label/label";

export default function InputText({
  type = "text",
  placeholder,
  onChange = () => {},
  value,
  required = true,
  id,
  label,
}) {
  return (
    <div className="flex justify-between items-center">
      <Label className="shrink-0 text-xl font-bold" text={label} id={id} />
      
      <input
        className="w-[70%] outline-none border border-black bg-white rounded-lg py-3 px-4 text-xl font-bold"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        id={id}
        name={id}
        required={required}
      />
    </div>
  );
}
