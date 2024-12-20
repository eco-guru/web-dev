export default function Input({ readOnly = false, value = "", type = "text" }) {
  return (
    <input
      readOnly={readOnly}
      type={type}
      value={value}
      className={`w-full outline-none border border-black rounded-lg py-3 px-4 text-xl font-bold`}
    />
  );
}
