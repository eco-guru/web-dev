"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";

export async function PATCH(req, { params }) {
  const { username } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userRole = cookieStore.get('user-role')?.value;
  
  try {
    const dataRequest = await req.json();
    const response = await fetch(
      `${API_BASE_URL}/admin/user/update?username=${username}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
          Cookie: `user-role=${encodeURIComponent(userRole)}`
        },
        credentials: "include",
        body: JSON.stringify(dataRequest)
      }
    );
    console.log(response);
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to UPDATE user" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    
    const data = await response.json();
    console.log(data);


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
