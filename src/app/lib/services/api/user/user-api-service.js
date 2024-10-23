"use server";

import { api } from "../api";
import { revalidatePath } from "next/cache";
import { permanentRedirect } from "next/navigation";

export const createUser = async (
  username,
  password,
  confirmPassword,
  phone
) => {
  console.log("masuk ga siii");

  try {
    const response = await api.post("/users", {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone,
    });
    console.log("response uhuy: ", response.status, response.data);

    return { status: response.status, data: response.data.data };
  } catch (error) {
    console.error("Error uhuy:", error.message);
    return error.message;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/users/login", {
      username: username,
      password: password,
    });

    console.log("response uhuy: ", response.status, response.data);

    permanentRedirect(
      `/user/profile?username=${response.data.data.username}&token=${response.data.data.token}`
    );
  } catch (error) {
    throw error;
  }
};

export const logOut = async ({ token }) => {
  console.log("token: ", token);

  try {
    const response = await api.delete("/users/logout", {
      headers: {
        Authorization: token,
      },
    });
    permanentRedirect("/signin");
  } catch (error) {
    console.error("Error uhuy logout:", error.status);
    return error.message;
  }
};

export const getUser = async ({ username, token }) => {
  try {
    const response = await api.get("/users/current", {
      headers: {
        Authorization: token,
      },
      params: {
        username: username,
      },
    });
    return { status: response.status, data: response.data.data };
  } catch (error) {
    throw error;
  }
};
