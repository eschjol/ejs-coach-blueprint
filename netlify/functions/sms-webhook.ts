import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { getDb, schema } from "../../db/client";
import {
  generateAiReply,
  parseTwilioWebhook,
  sendSms,
} from "./_shared/sms";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return twimlResponse("Method not allowed");
  }

  try {
    const rawBody = await req.text();
    const params = parseTwilioWebhook(rawBody);
    const from = params.From;
    const to = params.To;
    const messageBody = params.Body?.trim();

    if (!from || !messageBody) {
      return twimlResponse("");
    }

    const db = getDb();

    const [coach] = await db
      .select()
      .from(schema.coaches)
      .where(eq(schema.coaches.twilioNumber, to))
      .limit(1);

    if (!coach) {
      console.warn("No coach for Twilio number:", to);
      return twimlResponse("");
    }

    let [student] = await db
      .select()
      .from(schema.students)
      .where(eq(schema.students.phone, from))
      .limit(1);

    if (!student) {
      [student] = await db
        .insert(schema.students)
        .values({
          coachId: coach.id,
          firstName: "Guest",
          phone: from,
        })
        .returning();
    }

    await db.insert(schema.conversations).values({
      coachId: coach.id,
      studentId: student.id,
      phone: from,
      direction: "inbound",
      body: messageBody,
      aiGenerated: false,
    });

    const siteUrl = process.env.URL ?? "https://ejsgolf.com";
    const bookingUrl = `${siteUrl}/book/${coach.slug}`;

    const reply = await generateAiReply(
      coach,
      student,
      messageBody,
      bookingUrl,
    );

    await db.insert(schema.conversations).values({
      coachId: coach.id,
      studentId: student.id,
      phone: from,
      direction: "outbound",
      body: reply,
      aiGenerated: true,
    });

    const fromNumber = coach.twilioNumber ?? to;
    await sendSms(from, fromNumber, reply);

    if (
      messageBody.toLowerCase().includes("coach") ||
      messageBody.toLowerCase().includes("call me") ||
      messageBody.toLowerCase().includes("speak")
    ) {
      if (coach.phone) {
        await sendSms(
          coach.phone,
          fromNumber,
          `[EJS Blueprint] ${student.firstName} (${from}) needs you: "${messageBody}"`,
        );
      }
    }

    return twimlResponse("");
  } catch (err) {
    console.error("sms-webhook error:", err);
    return twimlResponse("");
  }
};

function twimlResponse(message: string) {
  const body = message
    ? `<Response><Message>${escapeXml(message)}</Message></Response>`
    : "<Response></Response>";
  return new Response(body, {
    headers: { "Content-Type": "text/xml" },
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const config: Config = {
  path: "/sms-webhook",
};
