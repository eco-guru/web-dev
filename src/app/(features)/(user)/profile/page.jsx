"use client";

import { useEffect, useState } from "react";
import InputProfileImage from "./components/input/inputProfileImage";
import InputTextProfile from "./components/input/inputTextProfile";
import { useRouter } from "next/navigation";
import RingProfileButton from "./components/button/ringProfileButton";
import ElevatedProfileButton from "./components/button/elevatedProfileButton";

export default function UserProfilePage() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const router = useRouter();

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user/current", {
        method: "GET",
      }); // Call your API route
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();

      setUsername(data.data.username);
      setPhone(data.data.phone);
    } catch (error) {
      console.error(error);
    }
  };

  const logoutUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      const result = await response.json();
      console.log(result.message); // Handle success message
      router.push("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Membuat URL untuk preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setImgFile(file);
      console.log("Selected file:", file.name); // Nama file
    } else {
      console.error("No file selected");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="px-[133px] py-[54px] w-full h-full">
        <form
          action=""
          className="rounded-[10px] border border-[#00000085] shadow w-full h-full py-[31px] px-[56px] flex flex-col gap-6"
        >
          <InputProfileImage onChange={onChange} imgUrl={previewUrl} />
          <br />
          <InputTextProfile
            label={"Username"}
            id={"username"}
            value={username}
            onchange={(e) => setUsername(e.target.value)}
          />
          <InputTextProfile
            label={"No Handphone"}
            id={"noHandphone"}
            value={phone}
            onchange={(e) => setPhone(e.target.value)}
          />
          <div className="flex gap-4 justify-end">
            <RingProfileButton
              text={"Logout"}
              className="border-red-600 hover:bg-red-700 text-red-600 hover:text-white font-bold"
              onClick={logoutUser}
            />
            <ElevatedProfileButton
              text={"Save"}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
            />
          </div>
        </form>
      </div>
    </>
  );
}
