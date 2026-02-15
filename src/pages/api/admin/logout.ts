import type { NextApiRequest, NextApiResponse } from "next";
import { setAdminSessionCookie } from "@/lib/server/admin-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  setAdminSessionCookie(res, null);
  return res.status(200).json({ ok: true });
}
