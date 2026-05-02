import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { getBookings, saveBooking } from "@/lib/bookings-store";

export const runtime = "nodejs";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email"),
  message: z.string().trim().min(10, "Please share more details about your event"),
  website: z.string().optional(),
});

const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function getRequestKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const previous = submissions.get(key) ?? [];
  const recent = previous.filter((entry) => now - entry < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(key, recent);
    return true;
  }

  submissions.set(key, [...recent, now]);
  return false;
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

function hasAdminAccess(request: NextRequest) {
  const expectedToken = process.env.BOOKINGS_ADMIN_TOKEN;
  if (!expectedToken) {
    return false;
  }

  const authToken = request.headers.get("x-admin-token");
  return authToken === expectedToken;
}

export async function GET(request: NextRequest) {
  if (!process.env.BOOKINGS_ADMIN_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        message: "Admin token is not configured on this deployment.",
      },
      { status: 503 }
    );
  }

  if (!hasAdminAccess(request)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Unauthorized.",
      },
      { status: 401 }
    );
  }

  const bookings = await getBookings();
  return NextResponse.json({ ok: true, bookings });
}

export async function POST(request: NextRequest) {
  const key = getRequestKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many requests. Please wait a minute and try again.",
      },
      { status: 429 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request payload." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: parsed.error.issues[0]?.message ?? "Please check your details and try again.",
      },
      { status: 400 }
    );
  }

  const booking = parsed.data;

  if (booking.website && booking.website.trim().length > 0) {
    return NextResponse.json({ ok: true, message: "Request received." }, { status: 200 });
  }

  const targetEmail = process.env.BOOKING_TO_EMAIL ?? "mcchelaa254@gmail.com";
  const senderEmail = process.env.BOOKING_FROM_EMAIL ?? process.env.SMTP_USER;
  const transporter = getTransporter();

  if (!transporter || !senderEmail) {
    console.info("[booking-fallback]", {
      name: booking.name,
      email: booking.email,
      message: booking.message,
      targetEmail,
      createdAt: new Date().toISOString(),
    });

    await saveBooking({
      name: booking.name,
      email: booking.email,
      message: booking.message,
      source: "fallback",
    });

    return NextResponse.json({
      ok: true,
      message: "Booking request received. Email delivery will be enabled after SMTP configuration.",
    });
  }

  try {
    await transporter.sendMail({
      from: `MC Chelaa Website <${senderEmail}>`,
      to: targetEmail,
      replyTo: booking.email,
      subject: `New Booking Request from ${booking.name}`,
      text: `Name: ${booking.name}\nEmail: ${booking.email}\n\nMessage:\n${booking.message}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Message:</strong></p>
        <p>${booking.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    await saveBooking({
      name: booking.name,
      email: booking.email,
      message: booking.message,
      source: "form",
    });

    return NextResponse.json({ ok: true, message: "Booking request sent successfully." });
  } catch (error) {
    console.error("[booking-error]", error);
    return NextResponse.json(
      {
        ok: false,
        message: "We could not send your request right now. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
