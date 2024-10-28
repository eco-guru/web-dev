"use server";

import { api } from "../api";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";

export const createUser = async (
  username,
  password,
  confirmPassword,
  phone
) => {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        phone: phone,
        password: password,
      }),
    });

    const result = await response.json();

    console.log("result: ", result);

    return { result };
  } catch (error) {
    console.error("Error uhuy:", error.message);
    return error.message;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        usernameOrPhone: username,
        password: password,
      }),
    });

    const data = await response.json();

    console.log("response data: ", data);

    permanentRedirect(
      `/user/profile?username=${data.user.username}&token=${data.user.token}`
    );
  } catch (error) {
    throw error;
  }
};

export const logOut = async ({ token }) => {
  console.log("token: ", token);

  try {
    const response = await fetch("http://localhost:5000/api/users/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await response.json();
    console.log("result: ", result);

    redirect("/signin");
  } catch (error) {
    console.error("Error uhuy logout:", error);
    return error.message;
  }
};

export const getUser = async ({ token }) => {
  try {
    const response = await fetch("http://localhost:5000/api/users/current", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await response.json();
    console.log("result: ", result);
    return result;
  } catch (error) {
    throw error;
  }
};
