import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";

export async function DELETE(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const response = await fetch(`${API_BASE_URL}/users/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to log out" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    cookieStore.delete("token");
    cookieStore.delete("user-role");

    return new Response(JSON.stringify({ message: "Logout successful" }), {
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
