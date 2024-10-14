"use client";

import Image from "next/image";
import { Theme } from "../../shared/theme.js";
import Link from "next/link.js";
import InputCheckbox from "../../components/input/checkbox/checkbox.jsx";
import InputSubmit from "../../components/input/submit/submit.jsx";
import InputText from "../../components/input/text/text.jsx";
import InputPassword from "../../components/input/password/password.jsx";
import { useState, useEffect } from "react";
import CreateUserAlert from "../../components/modal/create-alert.jsx";

// import services
import { createUser } from "../../../lib/services/api/user/user-api-service.js";

export default function SignUpPage() {
  // create user data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createUser(
      e,
      username,
      password,
      confirmPassword,
      phone
    );

    console.log(response, response.status);

    // munculin alert
    if (response.status === 201 || response.status === 200) {
      setAlert(true);
      setStatus(true);
    } else {
      setAlert(true);
      setStatus(false);
      setError(response.message);
    }
  };

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
        <Image
          src={"/img/signin.webp"}
          width={652}
          height={482}
          alt="signin photo"
          className="self-center	"
        />
        <p
          className="text-4xl font-extrabold leading-[49px] self-center	text-center"
          style={{ color: Theme.colors.primary }}
        >
          Starts for free and get <br /> attractive offers
        </p>
      </div>
      {/* bagian kanan */}
      <div
        className="w-1/2 text-white px-16 flex flex-col justify-center min-h-screen"
        style={{ backgroundColor: Theme.colors.primary }}
      >
        <h1 className="text-5xl font-extrabold mb-6">Gets started.</h1>
        <p className="text-2xl font-light mb-4">
          Already have an account?{" "}
          <Link href={"/signin"} className="font-extrabold">
            Log in
          </Link>{" "}
        </p>
        {/* divider */}
        <div className="flex items-center justify-center mb-5">
          <hr className="w-[50%]" />
          <p className="text-3xl font-extrabold px-2">or</p>
          <hr className="w-[50%]" />
        </div>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-5"
        >
          <InputText
            id={"username"}
            placeholder={"Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={"username is required"}
          />
          <InputText
            id={"phone"}
            placeholder={"Phone Number"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={"phone is required"}
          />
          <InputPassword
            id={"password"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={"password is required"}
          />
          <InputPassword
            id={"confirmPassword"}
            placeholder={"Confirm Password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={"confirm password is required"}
          />
          {/* TODO: agreement checkbox */}
          {/* agreement */}
          <InputCheckbox id={"agreement"}>
            I agree to platforms{" "}
            <span className="font-bold">Terms of service</span> and{" "}
            <span className="font-bold">Privacy policy</span>{" "}
          </InputCheckbox>
          {/* submit button */}
          <InputSubmit text={"Sign up"} id={"signup"} />
        </form>
      </div>
      {/* modal alert */}
      <CreateUserAlert active={alert} success={status} error={error} setAlert={setAlert} />
    </>
  );
}
