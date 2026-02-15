import type { NextApiRequest, NextApiResponse } from "next";
import { getDb, type AppointmentDoc } from "@/lib/mongodb";
import { sendAppointmentEmails } from "@/lib/server/mailer";

interface CreateAppointmentBody {
  first_name?: string;
  last_name?: string;
  email?: string;
  service_type?: string;
  appointment_date?: string;
  appointment_time?: string;
  addons?: string[];
}

function isValidField(value: unknown, maxLength: number) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength;
}

function isValidEmail(value: unknown) {
  if (typeof value !== "string") {
    return false;
  }

  const email = value.trim();
  if (email.length === 0 || email.length > 120) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidAddons(value: unknown) {
  if (typeof value === "undefined") {
    return true;
  }

  if (!Array.isArray(value) || value.length > 10) {
    return false;
  }

  return value.every((item) => typeof item === "string" && item.trim().length > 0 && item.trim().length <= 40);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as CreateAppointmentBody;

  if (
    !isValidField(body.first_name, 50) ||
    !isValidField(body.last_name, 50) ||
    !isValidEmail(body.email) ||
    !isValidField(body.service_type, 50) ||
    !isValidField(body.appointment_date, 20) ||
    !isValidField(body.appointment_time, 20) ||
    !isValidAddons(body.addons)
  ) {
    return res.status(400).json({ error: "Invalid appointment payload" });
  }

  const firstName = (body.first_name as string).trim();
  const lastName = (body.last_name as string).trim();
  const email = (body.email as string).trim().toLowerCase();
  const serviceType = (body.service_type as string).trim();
  const appointmentDate = (body.appointment_date as string).trim();
  const appointmentTime = (body.appointment_time as string).trim();
  const addons = Array.isArray(body.addons)
    ? body.addons.map((item) => item.trim()).filter(Boolean)
    : [];

  try {
    const db = await getDb();

    await db.collection<AppointmentDoc>("appointments").insertOne({
      first_name: firstName,
      last_name: lastName,
      email,
      service_type: serviceType,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      addons,
      created_at: new Date(),
    });

    let emailSent = true;
    try {
      await sendAppointmentEmails({
        first_name: firstName,
        last_name: lastName,
        email,
        service_type: serviceType,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        addons,
      });
    } catch (emailError) {
      emailSent = false;
      console.error("Appointment created but email send failed", emailError);
    }

    return res.status(201).json({ ok: true, email_sent: emailSent });
  } catch (error) {
    console.error("Failed to create appointment", error);
    return res.status(500).json({ error: "Failed to create appointment" });
  }
}
