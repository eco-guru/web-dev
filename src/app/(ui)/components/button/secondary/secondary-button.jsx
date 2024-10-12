export default function SecondaryButton({ text, className = null }) {
  return (
    <button
      type="submit"
      className={`px-5 py-2 rounded-md text-lg ${className}`}
    >
      {text}
    </button>
  );
}
