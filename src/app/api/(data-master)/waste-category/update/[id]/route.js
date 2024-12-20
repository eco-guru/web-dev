"use server";

import { cookies } from "next/headers";
// src/app/api/waste-category/[id]/route.js
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const url = "http://localhost:5000/api/waste-category/update";
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
      { message: "Category ID is required." },
      { status: 400 }
    );
  }

  try {
    const category = await request.json();

    if (!category) {
      return NextResponse.json(
        { message: "Category name is required." },
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
      body: JSON.stringify({ category, isDeleted: false }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to update waste category." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Waste category updated successfully.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating waste category:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
