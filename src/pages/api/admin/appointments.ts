import type { NextApiRequest, NextApiResponse } from "next";
import { getDb, type AppointmentDoc } from "@/lib/mongodb";
import { getAdminSessionCookie, verifyAdminSessionToken } from "@/lib/server/admin-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = getAdminSessionCookie(req);
  if (!token || !verifyAdminSessionToken(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const db = await getDb();
    const documents = await db
      .collection<AppointmentDoc>("appointments")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    const data = documents.map((doc) => ({
      id: doc._id.toString(),
      first_name: doc.first_name,
      last_name: doc.last_name,
      email: doc.email || "",
      service_type: doc.service_type,
      appointment_date: doc.appointment_date,
      appointment_time: doc.appointment_time,
      addons: Array.isArray(doc.addons) ? doc.addons : [],
      created_at: doc.created_at,
    }));

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Failed to fetch appointments", error);
    return res.status(500).json({ error: "Failed to fetch appointments" });
  }
}
