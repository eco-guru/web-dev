import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api"; // Default to localhost:5000

export async function POST(request) {
  const url = `${API_BASE_URL}/article/create`;

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const userRole = cookieStore.get("user-role")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Missing token: User is not authenticated" },
      { status: 401 }
    );
  }

  if (!userRole) {
    return NextResponse.json(
      { error: "Missing userRole: User role is required" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const {
      title,
      content,
      categoryId,
      isPublished,
      created_by,
      created_date,
      article_order,
      thumbnail_url,
    } = body;

    if (
      !title ||
      !content ||
      !categoryId ||
      !created_by ||
      !created_date ||
      typeof isPublished !== "boolean" ||
      typeof article_order !== "number" ||
      !thumbnail_url
    ) {
      return NextResponse.json(
        {
          message:
            "Validation failed: All fields are required and must be in the correct format. Ensure isPublished is a boolean and article_order is a number.",
        },
        { status: 400 }
      );
    }

    const createdDate = new Date(created_date);
    if (isNaN(createdDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid created_date: Date format is incorrect." },
        { status: 400 }
      );
    }
    const createdDateISOString = createdDate.toISOString();

    const sanitizedBody = {
      title,
      content,
      categoryId,
      isPublished,
      created_by,
      created_date: createdDateISOString,
      article_order,
      thumbnail_url,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: `user-role=${encodeURIComponent(userRole)}`,
      },
      body: JSON.stringify(sanitizedBody),
    });

    if (!response.ok) {
      let errorMessage = "Failed to create article: Unknown error from backend.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {}
      return NextResponse.json(
        { message: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || "Unexpected error"}` },
      { status: 500 }
    );
  }
}
