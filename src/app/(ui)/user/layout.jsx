import UserNavbar from "../components/navbar/user-navbar/user-navbar.jsx";

export default function UserLayout({ children }) {
  return (
    <section className="min-h-screen bg-white">
      <UserNavbar />
      <main className="max-w-7xl mx-auto pt-40">{children}</main>
    </section>
  );
}
