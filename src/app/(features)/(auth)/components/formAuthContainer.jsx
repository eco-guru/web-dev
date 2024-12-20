import Color from "../const/theme";

export default function FormAuthContainer({ children }) {
  return (
    <div
      className="px-[66px] py-11 w-1/2 flex flex-col justify-center text-white"
      style={{ backgroundColor: Color.primary }}
    >
      {children}
    </div>
  );
}
