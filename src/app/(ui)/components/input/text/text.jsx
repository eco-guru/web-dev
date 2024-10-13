import { Theme } from "../../../shared/theme.js";

export default function InputText({ id, placeholder, error, value, onChange }) {
  return (
    <div className="">
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-white text-black px-8 py-4 rounded-md text-3xl font-bold"
        style={{ outlineColor: Theme.colors.primary }}
      />
      {/* error */}
      <p className={`text-red-400 font-bold ${value ? "hidden" : ""}`}>
        {error}
      </p>
    </div>
  );
}
