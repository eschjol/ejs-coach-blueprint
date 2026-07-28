import type { Config } from "@netlify/functions";
import { eq, and, gte, lte } from "drizzle-orm";
import { getDb, schema } from "../../db/client";
import { sendSms } from "./_shared/sms";

export default async () => {
  try {
    const db = getDb();
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    const coaches = await db
      .select()
      .from(schema.coaches)
      .where(eq(schema.coaches.active, true));

    for (const coach of coaches) {
      const bookings = await db
        .select()
        .from(schema.bookings)
        .where(
          and(
            eq(schema.bookings.coachId, coach.id),
            gte(schema.bookings.createdAt, periodStart),
            lte(schema.bookings.createdAt, periodEnd),
          ),
        );

      const students = await db
        .select()
        .from(schema.students)
        .where(
          and(
            eq(schema.students.coachId, coach.id),
            gte(schema.students.createdAt, periodStart),
          ),
        );

      const conversations = await db
        .select()
        .from(schema.conversations)
        .where(
          and(
            eq(schema.conversations.coachId, coach.id),
            eq(schema.conversations.aiGenerated, true),
            gte(schema.conversations.createdAt, periodStart),
          ),
        );

      const revenueCents = bookings.reduce(
        (sum, b) => sum + (b.amountCents ?? 0),
        0,
      );

      await db.insert(schema.metricsSnapshots).values({
        coachId: coach.id,
        periodStart,
        periodEnd,
        newLeads: students.length,
        bookings: bookings.length,
        reviews: 0,
        revenueCents,
        aiReplies: conversations.length,
      });

      if (coach.phone) {
        const report = `[EJS Blueprint — ${periodStart.toLocaleString("default", { month: "long" })}]
New leads: ${students.length}
Bookings: ${bookings.length}
AI replies handled: ${conversations.length}
Revenue: $${(revenueCents / 100).toFixed(0)}

Reply HELP for support.`;

        await sendSms(
          coach.phone,
          coach.twilioNumber ?? process.env.TWILIO_FROM_NUMBER ?? "",
          report,
        );
      }
    }

    return json({ ok: true, coaches: coaches.length });
  } catch (err) {
    console.error("coach-report error:", err);
    return json({ error: "Report failed" }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  schedule: "@monthly",
};
