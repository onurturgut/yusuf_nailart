import type { NextApiRequest, NextApiResponse } from "next";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

interface SessionPayload {
  sub: "admin";
  exp: number;
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET environment variable");
  }
  return secret;
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(encodedPayload: string): SessionPayload | null {
  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SessionPayload;
    return parsed;
  } catch {
    return null;
  }
}

function signPayload(encodedPayload: string) {
  return createHmac("sha256", getSessionSecret()).update(encodedPayload).digest("base64url");
}

function splitToken(token: string) {
  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }
  return { encodedPayload: parts[0], signature: parts[1] };
}

export function createAdminSessionToken() {
  const payload: SessionPayload = {
    sub: "admin",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const encodedPayload = encodePayload(payload);
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string) {
  const parsed = splitToken(token);
  if (!parsed) {
    return false;
  }

  const expectedSignature = signPayload(parsed.encodedPayload);
  const actualSignatureBuffer = Buffer.from(parsed.signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (actualSignatureBuffer.length !== expectedSignatureBuffer.length) {
    return false;
  }

  if (!timingSafeEqual(actualSignatureBuffer, expectedSignatureBuffer)) {
    return false;
  }

  const payload = decodePayload(parsed.encodedPayload);
  if (!payload || payload.sub !== "admin") {
    return false;
  }

  return payload.exp > Math.floor(Date.now() / 1000);
}

export function getAdminSessionCookie(req: NextApiRequest) {
  const rawCookie = req.headers.cookie;
  if (!rawCookie) {
    return null;
  }

  const cookieParts = rawCookie.split(";").map((part) => part.trim());
  const tokenPart = cookieParts.find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!tokenPart) {
    return null;
  }

  return tokenPart.slice(`${COOKIE_NAME}=`.length) || null;
}

export function setAdminSessionCookie(res: NextApiResponse, token: string | null) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const cookie = token
    ? `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}${secure}`
    : `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;

  res.setHeader("Set-Cookie", cookie);
}
