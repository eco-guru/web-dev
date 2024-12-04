import Label from "../label";

export default function InputText({
  id,
  label,
  placeholder,
  onChange = () => {},
  list = [],
  formId = ''
}) {
  return (
    <div className="flex gap-[80px] justify-between items-center">
      <Label className="shrink-0" text={label} id={id} />
      <input
        onChange={onChange}
        id={id}
        type="text"
        placeholder={placeholder}
        className={`w-[70%] outline-none border border-black rounded-lg py-3 px-4 text-xl font-bold`}
        list={formId}
      />
      <datalist id={formId}>
        {list.map((value, key) => (<option key={key} value={value}></option>))}
      </datalist>
    </div>
  );
}
