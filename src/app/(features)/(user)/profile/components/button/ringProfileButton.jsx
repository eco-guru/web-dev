import Color from "../../../const/color";

export default function RingProfileButton({
  text,
  className = `bg-[#E3E3E3] hover:bg-[#E3E3E375] text-red-900`,
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg py-3 px-5 text-[16px] border ${className}`}
    >
      {text}
    </button>
  );
}
