import Color from "../../const/color";

export default function LabelInputUserProfile({ text, id }) {
  return (
    <label
      className="text-[24px] font-bold ml-3"
      htmlFor={id}
      style={{ color: Color.grey }}
    >
      {text}
    </label>
  );
}
