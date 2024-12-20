import Image from "next/image";
import Logo from "../../components/logo";
import Color from "../../const/theme";
import HeroAuthContainer from "../../components/hero";

export default function HeroSignin() {
  return (
    <HeroAuthContainer>
      <div
        className="bg-green-500 p-10 rounded-lg"
        style={{
          backgroundColor: Color.primary,
        }}
      >
        <div className="text-center text-white">
          <h1 className="font-extrabold text-[36px]">
            SELAMAT DATANG DI{" "}
            <span className="flex justify-center items-center">
              <Logo />
            </span>
          </h1>
          <br />
          <p className="font-extrabold text-[20px]" style={{ color: Color.white }}>
            Ubah barang tidak terpakai menjadi sesuatu yang lebih berharga
          </p>
        </div>
      </div>
      <Image
        className="mx-auto mb-10"
        src="/img/auth/hero.png"
        alt="Signin"
        width={682}
        height={482}
      />
    </HeroAuthContainer>
  );
}