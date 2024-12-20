export default function AuthLayout({ children }) {
  return (
    <div
      className="container flex justify-center min-h-screen min-w-full bg-white"
      style={{ fontFamily: ["Nunito", "sans-serif"] }}
    >
      {children}
    </div>
  );
}
