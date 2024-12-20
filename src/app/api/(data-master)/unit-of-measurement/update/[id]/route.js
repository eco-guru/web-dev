"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const url = `${API_BASE_URL}/uom/update`;
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
      { message: "ID is required." },
      { status: 400 }
    );
  }

  try {
    const { unit } = await request.json();

    // Validasi payload
    if (!unit) {
      return NextResponse.json(
        { message: "Unit is required." },
        { status: 400 }
      );
    }

    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: `user-role=${encodeURIComponent(userRole)}`,
      },
      body: JSON.stringify({
        unit: unit,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to update Unit of measurement." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Unit of measurement updated successfully.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating Unit of measurement:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
