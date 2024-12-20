"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;
  const url = `${API_BASE_URL}/uom/delete`;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userRole = cookieStore.get("user-role")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!userRole) {
    return new Response(JSON.stringify({ error: "Missing userRole" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!id) {
    return NextResponse.json(
      { message: "Wate Type ID is required." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        Cookie: `user-role=${encodeURIComponent(userRole)}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to delete Unit of Measurement." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Unit of Measurement deleted successfully.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Unit of Measurement:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
