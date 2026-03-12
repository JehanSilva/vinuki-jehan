"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  const sitePassword = process.env.SITE_PASSWORD || "test123";

  if (password === sitePassword) {
    (await cookies()).set("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    redirect("/");
  } else {
    // Basic error handling - could send back an error state in a more robust implementation
    console.error("Invalid password attempt");
  }
}
