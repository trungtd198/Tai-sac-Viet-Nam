import { createHmac, timingSafeEqual } from "node:crypto";
import { UserRole } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const COOKIE_NAME = "event_cms_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

type SessionPayload = {
  userId: string;
  exp: number;
};

function sessionSecret() {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || "change-this-secret";
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

function encodeSession(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decodeSession(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expectedSignature = sign(body);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (!payload.userId || !payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = decodeSession(token);
  if (!payload) return null;

  try {
    const user = await db.user.findFirst({
      where: {
        id: payload.userId,
        role: UserRole.ADMIN
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    return user;
  } catch (error) {
    console.error("Failed to load admin session", error);
    return null;
  }
}

export async function isAuthenticated() {
  return Boolean(await getAdminSession());
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export function setAdminSession(userId: string) {
  const token = encodeSession({
    userId,
    exp: Date.now() + SESSION_MAX_AGE * 1000
  });

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE
  });
}

export function clearAdminSession() {
  cookies().delete(COOKIE_NAME);
}
