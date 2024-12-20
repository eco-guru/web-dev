import NavbarUser from "./components/navbarUser";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen min-w-full bg-white">
      <NavbarUser />
      {children}
    </div>
  );
}
