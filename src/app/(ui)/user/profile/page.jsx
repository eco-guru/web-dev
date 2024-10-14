"use client";

import Image from "next/image";
import SecondaryButton from "../../components/button/secondary/secondary-button.jsx";
import InputTextValue from "../../components/input/text/text-value.jsx";
import ButtonSave from "../../components/button/save/save-button.jsx";
import { useState, useEffect } from "react";
import ButtonLogout from "../../components/button/logout/logout.jsx";
import { useSearchParams } from "next/navigation";
import { getUser } from "../../../lib/services/api/user/user-api-service.js";

export default function ProfilePage() {
  const token = useSearchParams().get("token");
  const username = useSearchParams().get("username");

  const [userData, setUserData] = useState({
    username: "",
    phone: "",
    token: "",
    profile_picture: "",
  });
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const res = await getUser({ username: username, token: token });
      setUserData(res.data); // Mengatur data user dari response
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("userdata: ", userData);

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
          value={userData.username}
        />
        {/* no handphone */}
        <InputTextValue
          id={"no handphone"}
          label={"No Handphone"}
          onChange={(e) => setPhone(e.target.value)}
          value={userData.phone}
        />
        {/* alamat */}
        <InputTextValue
          id={"alamat"}
          label={"Alamat"}
          onChange={(e) => setAddress(e.target.value)}
          value={userData.address}
        />
        {/* save button */}
        <div className="mt-20 w-full flex justify-end gap-10">
          <ButtonLogout token={token} />
          <ButtonSave />
        </div>
      </form>
    </div>
  );
}
