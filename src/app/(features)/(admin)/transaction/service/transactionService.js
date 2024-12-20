import Cookies from "js-cookie";

export const createTransaction = async (transactionData) => {
  const token = Cookies.get("token");
  const user_id = Cookies.get("id");
  try {
    const response = await fetch(
      "http://localhost:5000/api/transaction/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          ...transactionData,
          user_id: user_id,
          approved_by: user_id,
          transaction_date: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to create transaction:", error);
    throw error;
  }
};


export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Mengambil bagian "YYYY-MM-DD"
};