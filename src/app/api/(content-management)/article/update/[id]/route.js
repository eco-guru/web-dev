"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  console.log("Request Body: ", body);

  if (!id) {
    return new Response("ID is required", { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const url = `${API_BASE_URL}/article/update/${id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      credentials: "include",
      body: JSON.stringify({        
        title: body.title,
        content: body.content,
        categoryId: 3,
        isPublished: true,
        created_by: "user1",
        created_date: body.created_date,
        article_order: body.article_order,
        thumbnail_url: body.thumbnail_url,
      }),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to update article" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    console.log("Updated Article:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating article:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
