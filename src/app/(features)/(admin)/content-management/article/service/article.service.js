export const fetchArticles = async () => {
  try {
    const response = await fetch("/api/article/getAll", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch article data");
    }
    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
};


export const deleteArticle = async (id) => {
  try {
    const response = await fetch(`/api/article/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete article");
    }

    const data = await response.json();
    console.log("Deleted article response:", data);
    return data;
  } catch (error) {
    console.error("Error in deleteArticle service:", error.message);
    throw error;
  }
};

export const createArticle = async (body) => {
  if (!body) {
    throw new Error("Missing body for creating article");
  }

  try {
    const response = await fetch("/api/article/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create article");
    }

    const data = await response.json();
    console.log("Created article:", data);
    return data.data;
  } catch (error) {
    console.error("Error in createArticle service:", error.message);
    throw error;
  }
};

export const updateArticle = async (id, body) => {
  try {
    const response = await fetch(`/api/article/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("service: Failed to update article data");
    }

    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (error) {
    console.error("Error in updateArticle service:", error.message);
    throw error;
  }
};
