import Cookies from "js-cookie";

export const createTransactionData = async (transactionDataArray) => {
  const token = Cookies.get("token");
  try {
    const promises = transactionDataArray.map(async (data) => {
      const response = await fetch(
        "http://localhost:5000/api/transactionData/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error Response:", errorData); // Lihat detail error
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    });

    // Menunggu semua permintaan selesai
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Failed to create transaction data:", error);
    throw error;
  }
};

// api.js
export const fetchTransactionData = async (transaction_id) => {
  const url = `http://localhost:5000/api/transactionData/list/?transaction_id=${transaction_id}`;
  const token = Cookies.get("token");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include", // Jika cookies diperlukan
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Mengembalikan data dari respons
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error; // Lemparkan error agar bisa ditangani di tempat lain
  }
};

// api.js
export const fetchSingleTransactionData = async (id) => {
  const url = `http://localhost:5000/api/transactionData/getOne/${id}`;
  const token = Cookies.get("token");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include", // Jika cookies diperlukan
    });

    if (!response.status === 200) {
      return { message: "Transaction data not found" };
    }

    const data = await response.json();

    return data; // Mengembalikan data dari respons
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw error; // Lemparkan error agar bisa ditangani di tempat lain
  }
};
