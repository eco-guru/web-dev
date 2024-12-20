import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api";  // Sesuaikan dengan URL API Anda

export async function POST(request) {
  const url = `${API_BASE_URL}/videos/create`;

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
      description,
      duration,
      format,
      thumbnail_url,
      url: videoUrl,
      upload_date,
      uploaded_by,
      isActive,
      video_order,
    } = body;

    // Validasi fields
    if (
      !title ||
      !description ||
      typeof duration !== "number" ||  // Pastikan duration adalah angka
      duration < 0 ||                  // Durasi harus >= 0 (termasuk 0)
      !format ||
      !thumbnail_url ||
      !videoUrl ||
      !upload_date ||
      !uploaded_by ||
      typeof isActive !== "boolean" ||
      typeof video_order !== "number"
    ) {
      return NextResponse.json(
        {
          message:
            "Validation failed: All fields are required and must be in the correct format. Ensure duration is a number and is >= 0, and isActive is a boolean.",
        },
        { status: 400 }
      );
    }

    const parsedDuration = Number(duration);
    if (isNaN(parsedDuration) || parsedDuration < 0) {
      return NextResponse.json(
        {
          message: "Validation failed: duration must be a number >= 0.",
        },
        { status: 400 }
      );
    }

    if (!uploaded_by || typeof uploaded_by !== 'string' || uploaded_by.trim() === '') {
      return NextResponse.json(
        {
          message: "Validation failed: uploaded_by is required.",
        },
        { status: 400 }
      );
    }

    const startDate = new Date(upload_date);
    if (isNaN(startDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid upload_date: Date format is incorrect." },
        { status: 400 }
      );
    }
    const startDateISOString = startDate.toISOString();

    const { categoryId, ...sanitizedBody } = body;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Cookie: `user-role=${encodeURIComponent(userRole)}`,
      },
      body: JSON.stringify({
        ...sanitizedBody,
        duration: parsedDuration,
        upload_date: startDateISOString,
      }),
    });

    if (!response.ok) {
      let errorMessage = "Failed to create video: Unknown error from backend.";
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
    console.error("Error creating video:", error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message || "Unexpected error"}` },
      { status: 500 }
    );
  }
}
