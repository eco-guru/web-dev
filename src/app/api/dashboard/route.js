"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";

export async function GET(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userRole = cookieStore.get("user-role")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const thisYear = new Date().getFullYear();
  const startDate = new Date(thisYear, 0, 1).toISOString().substring(0, 10);
  const endDate = new Date(thisYear, 11, 31).toISOString().substring(0, 10);

  const params = new URLSearchParams({ startDate, endDate });

  const url = `${API_BASE_URL}/dashboard?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        Cookie: `user-role=${encodeURIComponent(userRole)}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error("Backend response:", responseText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch dashboard data" }),
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
    console.error("Fetch error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
