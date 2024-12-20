import { API_BASE_URL } from "@/app/const/const";

export default async function signup({
  username,
  phone,
  password,
  confirmPassword,
}) {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, phone, password }),
    });
    if (!response.ok) {
      throw new Error("Invalid create user");
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
