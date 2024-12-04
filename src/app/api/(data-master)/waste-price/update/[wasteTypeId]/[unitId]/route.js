"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { wasteTypeId, unitId } = params;
  const url = `${API_BASE_URL}/pricelist/update`;
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
      { message: "waste Type ID is required." },
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
    const { price } = await request.json();

    // Validasi payload
    if (!price) {
      return NextResponse.json(
        { message: "price is required." },
        { status: 400 }
      );
    }

    const startDate = new Date();
    const startDateISOString = startDate.toISOString();

    const response = await fetch(`${url}/${wasteTypeId}/${unitId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: `user-role=${encodeURIComponent(userRole)}`,
      },
      body: JSON.stringify({
        waste_type_id: wasteTypeId,
        uom_id: unitId,
        price: price,
        isActive: true,
        start_date: startDateISOString,
        end_date: startDateISOString,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to update waste price." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "waste price updated successfully.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating waste price:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
