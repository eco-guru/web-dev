import NavbarItem from "./navbarUserItem";

export default function NavbarUserMenu() {
  return (
    <ul className="flex justify-center gap-20">
      <li>
        <NavbarItem text="Dashboard" href="/dashboard" />
      </li>
      <li>
        <NavbarItem text="My Warehouse " href="/" />
      </li>
      <li>
        <NavbarItem text="Orders" href="/" />
      </li>
      <li>
        <NavbarItem text="Shop" href="/" />
      </li>
    </ul>
  );
}
