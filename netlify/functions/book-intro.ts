import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { getDb, schema } from "../../db/client";
import {
  createCalendarEvent,
  createIntroCheckoutSession,
} from "./_shared/integrations";

interface BookIntroBody {
  coachSlug: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  scheduledAt: string;
  handicapRange?: string;
}

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders(),
    });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = (await req.json()) as BookIntroBody;
    const { coachSlug, firstName, lastName, email, phone, scheduledAt, handicapRange } =
      body;

    if (!coachSlug || !firstName || !email || !phone || !scheduledAt) {
      return json({ error: "Missing required fields" }, 400);
    }

    const db = getDb();
    const [coach] = await db
      .select()
      .from(schema.coaches)
      .where(eq(schema.coaches.slug, coachSlug))
      .limit(1);

    if (!coach) {
      return json({ error: "Coach not found" }, 404);
    }

    let [student] = await db
      .select()
      .from(schema.students)
      .where(eq(schema.students.phone, phone))
      .limit(1);

    if (!student) {
      [student] = await db
        .insert(schema.students)
        .values({
          coachId: coach.id,
          firstName,
          lastName,
          email,
          phone,
          handicapRange,
        })
        .returning();
    }

    const [booking] = await db
      .insert(schema.bookings)
      .values({
        coachId: coach.id,
        studentId: student.id,
        lessonType: "intro",
        status: "pending",
        scheduledAt: new Date(scheduledAt),
        amountCents: coach.introLessonPriceCents,
      })
      .returning();

    const origin =
      req.headers.get("origin") ??
      process.env.URL ??
      "http://localhost:8888";

    const checkout = await createIntroCheckoutSession(
      coach,
      email,
      `${firstName} ${lastName ?? ""}`.trim(),
      scheduledAt,
      `${origin}/book/${coachSlug}/thanks?booking=${booking.id}`,
      `${origin}/book/${coachSlug}`,
    );

    if ("error" in checkout) {
      return json({ error: checkout.error }, 500);
    }

    await createCalendarEvent(
      coach,
      `Intro Lesson: ${firstName} ${lastName ?? ""}`.trim(),
      scheduledAt,
      60,
      email,
    );

    await db
      .update(schema.bookings)
      .set({ status: "confirmed" })
      .where(eq(schema.bookings.id, booking.id));

    return json({
      bookingId: booking.id,
      checkoutUrl: checkout.url,
      sessionId: checkout.sessionId,
    });
  } catch (err) {
    console.error("book-intro error:", err);
    const message =
      err instanceof Error && err.message.includes("Database URL")
        ? "Database not configured. Set NETLIFY_DATABASE_URL."
        : "Internal server error";
    return json({ error: message }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

export const config: Config = {
  path: "/book-intro",
};
