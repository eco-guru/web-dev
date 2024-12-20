"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const url = `${API_BASE_URL}/uom/create`;
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

  try {
    const { unit } = await request.json();

    // Validasi payload
    if (!unit) {
      return NextResponse.json(
        { message: "Unit is required." },
        { status: 400 }
      );
    }

    // Simulasi pengiriman ke API backend
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: `user-role=${encodeURIComponent(userRole)}`,
      },
      body: JSON.stringify({
        unit: unit,
        isDeleted: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to create unit of measurement." },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating unit of measurement:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
