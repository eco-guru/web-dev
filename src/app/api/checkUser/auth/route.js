"use server";

import { API_BASE_URL } from "@/app/const/const";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt'

export async function GET(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userRole = cookieStore.get('user-role')?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing token", login: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    if(await bcrypt.compare('User', userRole)) {
        return new Response(JSON.stringify({ error: "You are user", login: false }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    } else {
        return new Response(JSON.stringify({ 
            message: "success", 
            login: true, 
            user: await bcrypt.compare('Admin', userRole)
                ? 'admin'
                : await bcrypt.compare('Waste collector', userRole)
                ? 'wastecoll'
                : await bcrypt.compare('Educator', userRole) 
                && 'educator' 
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }
  }

}
