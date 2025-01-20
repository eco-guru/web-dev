// Fungsi untuk mengambil semua video
export const fetchUser = async () => {
  try {
    const response = await fetch("/api/user/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch video data");
    }
    const data = await response.json();
    console.log("Fetched videos:", data);
    return data.data; // Menyesuaikan dengan struktur data API backend
  } catch (error) {
    console.error("Error in fetchVideos service:", error.message);
    throw error;
  }
};

export const createUser = async (body) => {
  if (!body) {
    throw new Error("Missing body for creating video");
  }

  try {
    const response = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create video");
    } else {
      return {...data.data, ok: true};
    }

  } catch (error) {
    console.error("Error in createUser service:", error.message);
    return {error, ok: false};
  }
};

export const updateUser = async (username, body) => {
  if (!username || !body) {
    throw new Error("Missing id or body for updating user");
  }

  console.log("api req: ", body)

  try {
    const response = await fetch(`/api/user/update/${encodeURIComponent(username)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update video data");
    }
    const data = await response.json();
    console.log("Updated video:", data);
    return data.user;
  } catch (error) {
    console.error("Error in updateVideo service:", error.message);
    throw error;
  }
};
