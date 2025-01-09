"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export default async function signIn({ usernameOrPhone, password }) {
  const cookieStore = await cookies();
  console.log(`${API_BASE_URL}/users/login`);
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        usernameOrPhone,
        password,
      }),
    });

    console.log(response);
    
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }


    if(!await bcrypt.compare("User", data.user.role)) {
      cookieStore.set("token", data.user.token);
      cookieStore.set("user-role", data.user.role);
      cookieStore.set("id", data.user.id);
    } else {
      return { data, isAdmin: false, isWastecoll: false, isEducator: false, login: false }
    }

    const isAdmin = await bcrypt.compare("Admin", data.user.role);
    const isWastecoll = await bcrypt.compare('Waste collector', data.user.role);
    const isEducator = await bcrypt.compare('Educator', data.user.role);

    return { data, isAdmin, isWastecoll, isEducator };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
