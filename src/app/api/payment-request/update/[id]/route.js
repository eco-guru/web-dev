"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const url = `${API_BASE_URL}/payment-requests`;
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

  const userResponse = await fetch(`${API_BASE_URL}/users/current`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
    credentials: 'include'
  });

  const userCurrent = await userResponse.json();
  const user_id = userCurrent.data.id;

  try {
    const { payment_request_id, amount } = await request.json();

    if (!payment_request_id || !amount) {
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
        payment_request_id: payment_request_id,
        amount: amount,
        user_id: user_id
      }),
    });

    const data = await response.json();
    console.log("data: ",data);

    if (!response.ok) {
      return NextResponse.json(
        { message: data.data.message || "Failed to update waste type." },
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
