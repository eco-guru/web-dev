"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export default async function signIn({ usernameOrPhone, password }) {
  const cookieStore = await cookies();
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
    

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const data = await response.json();
    console.log(data);

    cookieStore.set("token", data.user.token);
    cookieStore.set("user-role", data.user.role);
    cookieStore.set("id", data.user.id);

    const isAdmin = await bcrypt.compare("Admin", data.user.role);
    // const isAdmin = data.user.role === "Admin";

    return { data, isAdmin };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
