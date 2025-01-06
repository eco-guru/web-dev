"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const url = `${API_BASE_URL}/payment-requests/accept`;
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
    const { payment_request_id, name, type, uri } = await request.json();

    if (!payment_request_id || !name || !type || !uri) {
      return NextResponse.json(
        { message: "Photo is required." },
        { status: 400 }
      );
    }

    // console.log(JSON.stringify({ 
    //     payment_request_id: payment_request_id, 
    //     name: name, 
    //     type: type, 
    //     uri: uri 
    //   }));

    const response = await fetch(`${url}/${payment_request_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: `user-role=${encodeURIComponent(userRole)}`,
      },
      credentials: 'include',
      body: JSON.stringify({ 
        payment_request_id: payment_request_id, 
        name: name, 
        type: type, 
        uri: uri 
      }),
    });

    const data = await response.json();
    console.log("data: ",data);

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
