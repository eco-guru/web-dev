"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  try {
    const dataRequest = await req.json();
    const response = await fetch(
      `${API_BASE_URL}/transactionData/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        credentials: "include",
        body: JSON.stringify(dataRequest)
      }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch transaction data" }),
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
