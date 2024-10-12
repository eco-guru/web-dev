import { Theme } from "../../../shared/theme.js";

export default function InputText({ id, placeholder, error }) {
  return (
    <div className="">
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        className="w-full bg-white text-black px-8 py-4 rounded-md text-3xl font-bold"
        style={{ outlineColor: Theme.colors.primary }}
      />
      {/* error */}
      <p className="text-red-400 font-bold" hidden>
        {error}
      </p>
    </div>
  );
}
