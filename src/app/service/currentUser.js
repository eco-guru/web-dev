export const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");  // Pastikan token ada di localStorage atau cookies
  
      if (!token) {
        throw new Error("No token found. User must be authenticated.");
      }
  
      const response = await fetch("/api/user/current", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching current user data:", error);
      throw error;
    }
  };
  