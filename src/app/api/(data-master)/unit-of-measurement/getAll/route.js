"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";

export async function GET(req) {
  const url = `${API_BASE_URL}/uom/get`;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch unit of measurement data" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
