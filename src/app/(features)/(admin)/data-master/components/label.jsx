export default function Label({ text, id, className = "" }) {
  return (
    <label htmlFor={id} className={`text-xl font-bold ${className}`}>
      {text}
    </label>
  );
}
