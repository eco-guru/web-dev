export const createWasteCategory = async ({ category, token }) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/waste-category/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          category: category,
          isDeleted: false,
        }),
      }
    );

    const result = await response.json();

    console.log("result: ", result);

    return { result };
  } catch (error) {
    console.error("Error", error.message);
    return error.message;
  }
};
