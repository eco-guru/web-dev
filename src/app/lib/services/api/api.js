import axios from "axios";

// Buat instance axios dengan base URL API
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL backend Express
});
