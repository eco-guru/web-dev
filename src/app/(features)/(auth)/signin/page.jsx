import FormSignin from "./components/form.jsx";
import HeroSignin from "./components/hero.jsx";

export default function SigninPage() {
  return (
    <div className="overflow-y-hidden flex justify-between w-screen h-screen">
      <HeroSignin />
      <FormSignin />
    </div>
  );
}
