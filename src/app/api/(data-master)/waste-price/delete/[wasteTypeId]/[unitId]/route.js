"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { wasteTypeId, unitId } = params;
  const url = `${API_BASE_URL}/pricelist/delete`;
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

  if (!wasteTypeId) {
    return NextResponse.json(
      { message: "Waste Type ID is required." },
      { status: 400 }
    );
  }

  if (!unitId) {
    return NextResponse.json(
      { message: "Unit ID is required." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${url}/${wasteTypeId}/${unitId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        Cookie: `user-role=${encodeURIComponent(userRole)}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to delete Waste Price." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Waste Price deleted successfully.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Waste Price:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
