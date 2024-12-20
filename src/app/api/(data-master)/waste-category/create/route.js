"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const url = "http://localhost:5000/api/waste-category/create";
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userRole = cookieStore.get("user-role")?.value;

  // Log token and user role to ensure they are retrieved correctly
  console.log("Token:", token);
  console.log("User Role:", userRole);

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
    const category = await request.json();
    console.log("Category Payload:", category);

    if (!category) {
      return NextResponse.json(
        { message: "Category is required." },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: `user-role=${encodeURIComponent(userRole)}`,
      },
      body: JSON.stringify({ category, isDeleted: false }),
    });

    const data = await response.json();
    console.log("Backend Response:", data); // Log the backend response

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to create waste category." },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating waste category:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}