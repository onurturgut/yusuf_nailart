import nodemailer from "nodemailer";

export interface AppointmentEmailPayload {
  first_name: string;
  last_name: string;
  email: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  addons?: string[];
}

function getAdminRecipients() {
  const adminEmailsRaw = process.env.ADMIN_EMAILS;
  const adminEmailSingle = process.env.ADMIN_EMAIL;

  if (adminEmailsRaw && adminEmailsRaw.trim().length > 0) {
    return adminEmailsRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (adminEmailSingle && adminEmailSingle.trim().length > 0) {
    return [adminEmailSingle.trim()];
  }

  return [];
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER?.trim();
  const passRaw = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const pass = (passRaw || "").replace(/\s+/g, "").trim();

  if (!host || !user || !pass || !from) {
    throw new Error("Missing SMTP configuration. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM.");
  }

  if (host.includes("gmail.com") && pass.length !== 16) {
    console.warn("SMTP_PASS does not look like a Gmail App Password (expected 16 chars after removing spaces).");
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    from,
  };
}

function getEmailProvider() {
  return (process.env.EMAIL_PROVIDER || "smtp").trim().toLowerCase();
}

async function sendWithBrevo(payload: AppointmentEmailPayload, adminRecipients: string[]) {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const fromEmail = process.env.BREVO_FROM_EMAIL?.trim();
  const fromName = process.env.BREVO_FROM_NAME?.trim() || "Yusuf Nail Art";

  if (!apiKey || !fromEmail) {
    throw new Error("Missing Brevo configuration. Please set BREVO_API_KEY and BREVO_FROM_EMAIL.");
  }

  const fullName = `${payload.first_name} ${payload.last_name}`.trim();

  const adminHtml = `
    <h2>Yeni Randevu Talebi</h2>
    <p><strong>Ad Soyad:</strong> ${fullName}</p>
    <p><strong>E-posta:</strong> ${payload.email}</p>
    <p><strong>Hizmet:</strong> ${payload.service_type}</p>
    <p><strong>Tarih:</strong> ${payload.appointment_date}</p>
    <p><strong>Saat:</strong> ${payload.appointment_time}</p>
  `;

  const customerHtml = `
    <h2>Randevunuz Alindi</h2>
    <p>Merhaba ${fullName},</p>
    <p>Randevu talebiniz basariyla alindi.</p>
    <p><strong>Hizmet:</strong> ${payload.service_type}</p>
    <p><strong>Tarih:</strong> ${payload.appointment_date}</p>
    <p><strong>Saat:</strong> ${payload.appointment_time}</p>
    <p>En kisa surede sizinle iletisime gececegiz.</p>
  `;

  const adminReq = fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: fromName },
      to: adminRecipients.map((email) => ({ email })),
      subject: `Yeni randevu: ${fullName} - ${payload.appointment_date} ${payload.appointment_time}`,
      htmlContent: adminHtml,
    }),
  });

  const customerReq = fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: fromName },
      to: [{ email: payload.email }],
      subject: "Randevu talebiniz alindi",
      htmlContent: customerHtml,
    }),
  });

  const [adminRes, customerRes] = await Promise.all([adminReq, customerReq]);
  if (!adminRes.ok || !customerRes.ok) {
    const adminText = await adminRes.text();
    const customerText = await customerRes.text();
    throw new Error(`Brevo send failed. admin=${adminRes.status} customer=${customerRes.status} adminBody=${adminText} customerBody=${customerText}`);
  }
}

export async function sendAppointmentEmails(payload: AppointmentEmailPayload) {
  const adminRecipients = getAdminRecipients();

  if (adminRecipients.length === 0) {
    throw new Error("Missing admin recipient. Please set ADMIN_EMAIL or ADMIN_EMAILS.");
  }

  const provider = getEmailProvider();
  if (provider === "brevo") {
    await sendWithBrevo(payload, adminRecipients);
    return;
  }

  const config = getSmtpConfig();

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  const fullName = `${payload.first_name} ${payload.last_name}`.trim();

  const adminHtml = `
    <h2>Yeni Randevu Talebi</h2>
    <p><strong>Ad Soyad:</strong> ${fullName}</p>
    <p><strong>E-posta:</strong> ${payload.email}</p>
    <p><strong>Hizmet:</strong> ${payload.service_type}</p>
    <p><strong>Tarih:</strong> ${payload.appointment_date}</p>
    <p><strong>Saat:</strong> ${payload.appointment_time}</p>
  `;

  const customerHtml = `
    <h2>Randevunuz Alındı</h2>
    <p>Merhaba ${fullName},</p>
    <p>Randevu talebiniz başarıyla alındı.</p>
    <p><strong>Hizmet:</strong> ${payload.service_type}</p>
    <p><strong>Tarih:</strong> ${payload.appointment_date}</p>
    <p><strong>Saat:</strong> ${payload.appointment_time}</p>
    <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
  `;

  await Promise.all([
    transporter.sendMail({
      from: config.from,
      to: adminRecipients.join(","),
      subject: `Yeni randevu: ${fullName} - ${payload.appointment_date} ${payload.appointment_time}`,
      html: adminHtml,
    }),
    transporter.sendMail({
      from: config.from,
      to: payload.email,
      subject: "Randevu talebiniz alındı",
      html: customerHtml,
    }),
  ]);
}
