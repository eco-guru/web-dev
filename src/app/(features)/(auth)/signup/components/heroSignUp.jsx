import Image from "next/image";
import HeroAuthContainer from "../../components/hero";
import Logo from "../../components/logo";
import Color from "../../const/theme";

export default function HeroSignup() {
  return (
    <HeroAuthContainer>
      <Logo />
      <Image
        src="/img/auth/hero.png"
        alt="Signin"
        width={682}
        height={482}
        className="mx-auto"
      />
      <h1
        className="font-extrabold text-[36px] text-center mb-20"
        style={{ color: Color.primary }}
      >
        Starts for free and get <br />
        attractive offers
      </h1>
    </HeroAuthContainer>
  );
}
