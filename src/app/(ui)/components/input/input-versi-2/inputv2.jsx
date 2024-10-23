export default function InputVersiDua({ label, children, id }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <label htmlFor={id} className="text-[20px] font-bold w-[20%]">
        {label}
      </label>
      <div className="flex w-[80%]">{children}</div>
    </div>
  );
}
