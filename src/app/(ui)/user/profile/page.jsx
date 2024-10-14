"use client";

import Image from "next/image";
import SecondaryButton from "../../components/button/secondary/secondary-button.jsx";
import InputTextValue from "../../components/input/text/text-value.jsx";
import ButtonSave from "../../components/button/save/save-button.jsx";
import { useState, useEffect } from "react";
import ButtonLogout from "../../components/button/logout/logout.jsx";
import { useRouter } from "next/navigation.js";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    // console.log(data.data);

    if (data) {
      setUsername(data.data.username);
      setPhone(data.data.phone);
      if (data.data.address) {
        setAddress(data.data.address);
      }
    }
  }, []); // <- Empty array ensures this useEffect runs only once

  return (
    <div className="border rounded-xl px-14 py-8 shadow-lg">
      <form action="">
        {/* profile picture */}
        <div className="">
          <p className="text-[#707070] text-2xl font-bold mb-5">
            Profile Picture
          </p>
          <div className="flex gap-12 items-center">
            <Image
              src={"/img/avatar.webp"}
              width={160}
              height={160}
              alt="avatar"
              className="rounded-full"
            />
            <div className="flex gap-3">
              <SecondaryButton
                text="Change Profile"
                className={"text-white bg-[#007AFF]"}
              />
              <SecondaryButton
                text="Delete Picture"
                className={"text-red-600 bg-[#E3E3E3]"}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        {/* username */}
        <InputTextValue
          id={"username"}
          label={"Username"}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {/* no handphone */}
        <InputTextValue
          id={"no handphone"}
          label={"No Handphone"}
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        {/* alamat */}
        <InputTextValue
          id={"alamat"}
          label={"Alamat"}
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        {/* save button */}
        <div className="mt-20 w-full flex justify-end gap-10">
          <ButtonLogout />
          <ButtonSave />
        </div>
      </form>
    </div>
  );
}
