export default function Heading1({ text, className = "" }) {
  return <h1 className={`text-2xl font-bold ${className}`}>{text}</h1>;
}
