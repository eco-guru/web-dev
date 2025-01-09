"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";

export async function POST(req) {
  const body = await req.json();
  console.log("Request Body: ", body);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userRole = cookieStore.get('user-role')?.value;

  const url = `${API_BASE_URL}/videos/create`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        Cookie: `user-role=${encodeURIComponent(userRole)}`
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to create video" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Created Video:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating article:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
