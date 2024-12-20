import Color from "../../(auth)/const/theme";
import LogoUserPage from "./logoUserPage";
import NavbarUserMenu from "./navbarUserMenu";
import UserAvatar from "./userAvatar";

export default function NavbarUser() {
  return (
    <nav
      className="px-[47px] py-[27px] flex justify-between items-center"
      style={{ backgroundColor: Color.primary }}
    >
      <LogoUserPage />
      <NavbarUserMenu />
      <UserAvatar />
    </nav>
  );
}
