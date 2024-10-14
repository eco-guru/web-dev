"use server";

import { api } from "../api";
import { revalidatePath } from "next/cache";
import { permanentRedirect } from "next/navigation";

export const createUser = async (
  e,
  username,
  password,
  confirmPassword,
  phone
) => {
  e.preventDefault();
  try {
    const response = await api.post("/users", {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone,
    });

    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error uhuy create user:", error);
    return error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/users/login", {
      username: username,
      password: password,
    });

    // console.log(response);
    permanentRedirect(
      `/user/profile/${response.data.data.username}?token=${response.data.data.token}`
    );
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    const response = await api.delete("/users/logout");
    return response;
  } catch (error) {
    console.error("Error uhuy logout:", error);
    return error;
  }
};

export const getUser = async ({ username, token }) => {
  try {
    const response = await api.get("/users/current", { 
      headers: {
        Authorization: `${token}`,
      },
      params: {
        username: username,
      },
     });
    return response; // Pastikan mengembalikan data dari response
  } catch (error) {
    throw error;
  }
};
