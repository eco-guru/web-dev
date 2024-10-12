import Image from "next/image";
import { Theme } from "../../shared/theme.js";
import Link from "next/link.js";
import InputCheckbox from "../../components/input/checkbox/checkbox.jsx";
import InputSubmit from "../../components/input/submit/submit.jsx";
import InputText from "../../components/input/text/text.jsx";
import InputPassword from "../../components/input/password/password.jsx";

export default function SignInPage(params) {
  return (
    <>
      {/* bagian kiri */}
      <div className="w-1/2 flex flex-col justify-around bg-white min-h-screen px-8">
        <h1
          className={`text-4xl font-extrabold tracking-widest	`}
          style={{ color: Theme.colors.primary }}
        >
          BANK <br /> SAMPAH
        </h1>
        <div className="">
          <h1
            className={`text-4xl font-extrabold tracking-widest	text-center text-black`}
          >
            SELAMAT DATANG DI <br /> BANK SAMPAH!
          </h1>
          <br />
          <br />
          <p className="text-2xl font-bold self-center	text-center text-[#6B6B6B]">
            Ubah barang tidak terpakai menjadi sesuatu yang <br /> lebih
            berharga
          </p>
        </div>
        <Image
          src={"/img/signin.webp"}
          width={652}
          height={482}
          alt="signin photo"
          className="self-center	"
        />
      </div>
      {/* bagian kanan */}
      <div
        className="w-1/2 text-white px-16 flex flex-col justify-center min-h-screen"
        style={{ backgroundColor: Theme.colors.primary }}
      >
        <h1 className="text-5xl font-extrabold mb-6">Login.</h1>
        <p className="text-2xl font-light mb-4">
          Do not have an account?{" "}
          <Link href={"/signup"} className="font-extrabold">
            Sign up
          </Link>{" "}
        </p>
        {/* divider */}
        <div className="flex items-center justify-center mb-5">
          <hr className="w-[50%]" />
          <p className="text-3xl font-extrabold px-2">or</p>
          <hr className="w-[50%]" />
        </div>
        <form action="" className="flex flex-col gap-5">
          <InputText
            id={"username"}
            placeholder={"Username"}
            error={"username is required"}
          />
          <InputPassword
            id={"password"}
            placeholder={"Password"}
            error={"password is required"}
          />
          {/* agreement */}
          <InputCheckbox id={"remember"}>Remember me</InputCheckbox>
          {/* submit button */}
          <InputSubmit text={"Login"} id={"login"} />
        </form>
        <Link href={"/user/profile"}>Profile</Link>
      </div>
      {/* bagian kanan */}
    </>
  );
}
