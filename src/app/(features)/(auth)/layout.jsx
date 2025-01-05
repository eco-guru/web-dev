export default function AuthLayout({ children }) {
  return (
    <div
      className="container flex justify-center min-h-screen min-w-full bg-white"
    >
      {children}
    </div>
  );
}
