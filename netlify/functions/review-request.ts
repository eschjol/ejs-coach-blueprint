import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { getDb, schema } from "../../db/client";
import { sendSms } from "./_shared/sms";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const { bookingId } = (await req.json()) as { bookingId: string };
    if (!bookingId) return json({ error: "bookingId required" }, 400);

    const db = getDb();
    const [booking] = await db
      .select()
      .from(schema.bookings)
      .where(eq(schema.bookings.id, bookingId))
      .limit(1);

    if (!booking || booking.reviewRequested) {
      return json({ ok: true, skipped: true });
    }

    const [student] = await db
      .select()
      .from(schema.students)
      .where(eq(schema.students.id, booking.studentId))
      .limit(1);

    const [coach] = await db
      .select()
      .from(schema.coaches)
      .where(eq(schema.coaches.id, booking.coachId))
      .limit(1);

    if (!student || !coach) return json({ error: "Not found" }, 404);

    const reviewUrl = coach.googleReviewUrl ?? process.env.URL ?? "https://ejsgolf.com";
    const message = `Thanks for your lesson with ${coach.name}! If you have 30 seconds, a Google review helps other golfers find us: ${reviewUrl}`;

    await sendSms(
      student.phone,
      coach.twilioNumber ?? process.env.TWILIO_FROM_NUMBER ?? "",
      message,
    );

    await db
      .update(schema.bookings)
      .set({ reviewRequested: true, status: "completed" })
      .where(eq(schema.bookings.id, bookingId));

    return json({ ok: true });
  } catch (err) {
    console.error("review-request error:", err);
    return json({ error: "Review request failed" }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  path: "/review-request",
};
