import { api } from "../api";

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

    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error create user:", error);
    throw error;
  }
};
