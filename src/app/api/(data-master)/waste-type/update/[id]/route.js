"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const url = `${API_BASE_URL}/waste-type/update`;
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
    const { wasteCategoryId, newWasteType } = await request.json();

    if (!wasteCategoryId || !newWasteType) {
      return NextResponse.json(
        { message: "Category ID and newWasteType is required." },
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
        type: newWasteType,
        waste_category_id: wasteCategoryId,
        isDeleted: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to update waste type." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Waste type updated successfully.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating waste type:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
