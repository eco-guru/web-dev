"use client";

import { useState, useEffect } from "react";
import Divider from "../../components/divider";
import FormAuthContainer from "../../components/formAuthContainer";
import Heading1 from "../../components/heading1";
import InputCheckbox from "../../components/input/inputCheckbox";
import InputSubmit from "../../components/input/inputSubmit";
import InputText from "../../components/input/inputText";
import SubTitle from "../../components/subTitle";
import { useRouter } from "next/navigation";
import signIn from "../service/signin.service";

export default function FormSignin() {
  const router = useRouter();
  const [usernameOrPhone, setUsernameOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const checkUser = async () => {
    const response = await fetch('/api/checkUser/auth', { method: "GET" });
    const authentication = await response.json();

    if(authentication.login) {
      return router.push('/dashboard');
    }
    return null;
  }

  useEffect(() => {
    checkUser();
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({
        usernameOrPhone: usernameOrPhone,
        password: password,
      });
      
      if (response.isAdmin || response.isEducator) {
        router.push("/dashboard");
      } else if(response.isWastecoll) {
        router.push('/transaction');
      } else if (!response.login) {
        alert('Login gagal! Web hanya bisa diakses oleh Admin');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <FormAuthContainer>
      <div className="text-left">
        <Heading1 text={"Masuk."} />
      </div>
      <Divider />
      <form action="" className=" flex flex-col gap-6" onSubmit={handleSignin}>
        <InputText
          type={"text"}
          placeholder={"Username"}
          value={usernameOrPhone}
          onChange={(e) => setUsernameOrPhone(e.target.value)}
        />
        <InputText
          type={"password"}
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputCheckbox label={"Remember me"} id={"remember"} />
        <InputSubmit text={"Login"} />
      </form>
    </FormAuthContainer>
  );
}
