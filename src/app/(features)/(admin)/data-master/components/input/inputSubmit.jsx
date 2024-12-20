import Color from "../../../const/color";

export default function InputSubmit({ text }) {
  return (
    <button
      className="text-white py-3 px-14 rounded-lg"
      style={{ backgroundColor: Color.primary }}
    >
      {text}
    </button>
  );
}
