import { NextRequest, NextResponse } from "next/server";

// NOTE: Replace this with your DB logic (Prisma/Mongo/etc.)
// For now we keep an in-memory store keyed by a mock user id from cookie 'uid'.
// This will reset on server restart.
const STORE: Record<string, any> = {};

const DEFAULT_PROFILE = {
  parentName: "Parent",
  phone: "9876543210",
  role: "Mother",
  email: "parent@example.com",
  studentName: "Student",
};

function authUser(req: NextRequest) {
  // Expect a cookie 'uid' for demo. Integrate with your real auth/session.
  const uid = req.cookies.get("uid")?.value;
  if (!uid) return null;
  return uid;
}

export async function GET(req: NextRequest) {
  const uid = authUser(req);
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!STORE[uid]) STORE[uid] = { ...DEFAULT_PROFILE };
  return NextResponse.json({ profile: STORE[uid] }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const uid = authUser(req);
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { profile, password } = body || {};
  if (!profile) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  // Basic validation
  const emailOk = /.+@.+\..+/.test(profile.email || "");
  const phoneOk = /\d{7,15}/.test(String(profile.phone || "").replace(/\D/g, ""));
  if (!profile.parentName || !profile.studentName || !emailOk || !phoneOk) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  // Persist
  STORE[uid] = {
    parentName: String(profile.parentName),
    phone: String(profile.phone),
    role: ["Mother", "Father", "Guardian"].includes(profile.role) ? profile.role : "Mother",
    email: String(profile.email),
    studentName: String(profile.studentName),
  };

  // If password present: here you'd update it in your auth provider.
  // If using Firebase on server, call Admin SDK; otherwise client page can handle reauth.
  if (password) {
    // no-op demo
  }

  return NextResponse.json({ ok: true, profile: STORE[uid] }, { status: 200 });
}


