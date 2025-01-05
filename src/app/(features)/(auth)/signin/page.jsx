import FormSignin from "./components/form.jsx";
import HeroSignin from "./components/hero.jsx";
import { metadata } from "@/app/layout.js";

export default function SigninPage() {
  metadata.title = "Login | Runtah";
  return (
    <div className="overflow-y-hidden flex justify-between w-screen h-screen">
      <HeroSignin />
      <FormSignin />
    </div>
  );
}
