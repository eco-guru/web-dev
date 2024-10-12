export default function InputTextValue({ id, label, value, error }) {
  return (
    <div className="my-7">
      <label
        htmlFor={id}
        className="ml-3 text-[#707070] text-2xl font-bold mb-3"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        className={`text-black outline-none rounded-lg px-5 py-2 text-2xl w-full border focus:border-[#276561] hover:border-[#27656179]`}
      />

      {/* error */}
      <p className="text-red-400 font-bold" hidden>
        {error}
      </p>
    </div>
  );
}
