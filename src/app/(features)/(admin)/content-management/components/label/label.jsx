export default function Label({ text, id }) {
  return (
    <label htmlFor={id} className="text-[16px] font-semibold">
      {text}
    </label>
  );
}
