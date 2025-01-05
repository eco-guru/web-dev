"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  console.log(body);

  if (!id) {
    return new Response("ID is required", { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const url = `${API_BASE_URL}/videos/update/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        id: Number(id),
        title: body.title,
        description:
          body.description,
        duration: 125,
        format: "MP4",
        thumbnail_url: body.thumbnail_url,
        url: body.url,
        upload_date: new Date().toISOString(),
        uploaded_by: "user1",
        categoryId: body.categoryId,
        isActive: body.isActive,
        video_order: body.video_order,
      }),
    });

    console.log("response: ", response);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed toupdate video" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
