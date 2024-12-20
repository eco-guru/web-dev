// Fungsi untuk mengambil semua video
export const fetchVideos = async () => {
  try {
    const response = await fetch("/api/video/getAll", {
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

// Fungsi untuk menghapus video berdasarkan ID
export const deleteVideo = async (id) => {
  if (!id) {
    throw new Error("Missing id for deleting video");
  }

  try {
    const response = await fetch(`/api/video/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete video");
    }

    const data = await response.json();
    console.log("Deleted video response:", data);
    return data;
  } catch (error) {
    console.error("Error in deleteVideo service:", error.message);
    throw error;
  }
};

export const createVideo = async (body) => {
  if (!body) {
    throw new Error("Missing body for creating video");
  }

  try {
    const response = await fetch("/api/videos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create video");
    }

    const data = await response.json();
    console.log("Created video:", data);
    return data.data;
  } catch (error) {
    console.error("Error in createVideo service:", error.message);
    throw error;
  }
};

export const updateVideo = async (id, body) => {
  if (!id || !body) {
    throw new Error("Missing id or body for updating video");
  }

  try {
    const response = await fetch(`/api/video/update/${id}`, {
      method: "PUT",
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
    return data.data;
  } catch (error) {
    console.error("Error in updateVideo service:", error.message);
    throw error;
  }
};
