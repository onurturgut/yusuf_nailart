import type { NextApiRequest, NextApiResponse } from "next";
import { createAdminSessionToken, setAdminSessionCookie } from "@/lib/server/admin-auth";

interface LoginBody {
  email?: string;
  password?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminEmails = process.env.ADMIN_EMAILS;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if ((!adminEmail && !adminEmails) || !adminPassword) {
    return res.status(500).json({ error: "Missing admin credentials in env vars" });
  }

  const body = req.body as LoginBody;
  const email = body.email?.trim().toLowerCase();
  const password = body.password?.trim();

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const allowedEmails = [adminEmail, ...(adminEmails?.split(",") || [])]
    .map((value) => (value || "").trim().toLowerCase())
    .filter(Boolean);

  const isEmailAllowed = allowedEmails.includes(email);
  const isPasswordValid = password === adminPassword.trim();

  if (!isEmailAllowed || !isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    const token = createAdminSessionToken();
    setAdminSessionCookie(res, token);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ error: "Failed to create session" });
  }
}
