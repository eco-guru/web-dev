"use client";

import { useEffect, useState } from "react";
import InputProfileImage from "./components/input/inputProfileImage";
import InputTextProfile from "./components/input/inputTextProfile";
import { useRouter } from "next/navigation";
import RingProfileButton from "./components/button/ringProfileButton";
import ElevatedProfileButton from "./components/button/elevatedProfileButton";
import { API_BASE_URL } from "@/app/const/const";
import Cookies from "js-cookie";

export default function UserProfilePage() {
  const [previewUrl, setPreviewUrl] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    profile_picture: null,
  });

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

      setFormData({
        ...formData,
        username: data.data.username,
        phone: data.data.phone,
      });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ profile_picture: "File size must be less than 5MB" });
        return;
      }
      // Membuat URL untuk preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setFormData({ ...formData, profile_picture: file });
      console.log("Selected file:", file.name); // Nama file
    } else {
      console.error("No file selected");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    if (formData.phone) data.append("phone", formData.phone);
    if (formData.profile_picture)
      data.append("profile_picture", formData.profile_picture);

    const token = Cookies.get("token");
    console.log(token);

    try {
      const response = await fetch(`${API_BASE_URL}/users/current`, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        credentials: "include",
        mode: "cors",
        body: data,
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        alert(result.message);
      } else {
        if (result.message) {
          alert(result.message);
        } else {
          alert("Upload berhasil");
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="px-[133px] py-[54px] w-full h-full">
        <form
          onSubmit={onSubmit}
          className="rounded-[10px] border border-[#00000085] shadow w-full h-full py-[31px] px-[56px] flex flex-col gap-6"
        >
          <InputProfileImage onChange={onChange} imgUrl={previewUrl} />
          <br />
          <InputTextProfile
            label={"Username"}
            id={"username"}
            value={formData.username}
            onchange={handleInputChange}
          />
          <InputTextProfile
            label={"No Handphone"}
            id={"noHandphone"}
            value={formData.phone}
            onchange={handleInputChange}
          />
          <div className="flex gap-4 justify-end">
            <RingProfileButton
              text={"Logout"}
              className="border-red-600 hover:bg-red-700 text-red-600 hover:text-white font-bold"
              onClick={logoutUser}
            />
            <ElevatedProfileButton
              id={"save-profile"}
              text={"Save"}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
            />
            <input type="submit" value="save" hidden id="save-profile" />
          </div>
        </form>
      </div>
    </>
  );
}
