import Color from "../../const/theme";

export default function InputSubmit({ text }) {
  return (
    <input
      className="text-[32px] font-bold leading-10 px-[31px] py-[15px] rounded-[10px] outline-none w-full bg-white cursor-pointer hover:bg-[#ffffffe5]"
      type="submit"
      value={text}
      style={{ color: Color.primary }}
    />
  );
}
