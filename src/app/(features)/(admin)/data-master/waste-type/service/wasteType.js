import Cookies from "js-cookie";

export const fetchWasteTypes = async () => {
  const token = Cookies.get("token");

  try {
    const response = await fetch("http://localhost:5000/api/waste-type/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch waste types:", error);
    throw error;
  }
};
