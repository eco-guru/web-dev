"use client";

import { useState } from "react";
import Divider from "../../components/divider";
import FormAuthContainer from "../../components/formAuthContainer";
import Heading1 from "../../components/heading1";
import InputCheckbox from "../../components/input/inputCheckbox";
import InputSubmit from "../../components/input/inputSubmit";
import InputText from "../../components/input/inputText";
import SubTitle from "../../components/subTitle";
import signup from "../service/signup";

export default function FormSignup() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({
        username: username,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
      });

      console.log(response);

      setUsername("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <FormAuthContainer>
      <div className="text-left">
        <Heading1 text={"Get's started."} />
        <SubTitle
          text={"Already have an account? "}
          href={"/signin"}
          textLink={"Log in"}
        />
      </div>
      <Divider />
      <form action="" className=" flex flex-col gap-6" onSubmit={handleSignup}>
        <InputText
          type={"username"}
          placeholder={"Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputText
          type={"noHandphone"}
          placeholder={"No Handphone"}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <InputText
          type={"password"}
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputText
          type={"password"}
          placeholder={"Confirm Password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <InputCheckbox
          label={"I agree to platforms Terms of service and Privacy policy"}
          id={"agree"}
        />
        <InputSubmit text={"Sign up!"} />
      </form>
    </FormAuthContainer>
  );
}
