export default function SecondaryButton({ text, className = null }) {
  return (
    <button
      type="submit"
      className={`px-5 py-3 rounded-md text-xl ${className}`}
    >
      {text}
    </button>
  );
}
