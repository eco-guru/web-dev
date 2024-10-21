import { Theme } from "../../../shared/theme.js";

export default function InputSubmit({ text, id }) {
  return (
    <div className="">
      <input
        type="submit"
        value={text}
        id={id}
        className="w-full bg-white px-8 py-4 rounded-md text-3xl font-bold hover:bg-slate-200"
        style={{ color: Theme.colors.primary }}
      />
    </div>
  );
}
