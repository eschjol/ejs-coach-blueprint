import type { Config } from "@netlify/functions";
import { eq, and, gte, lte } from "drizzle-orm";
import { getDb, schema } from "../../db/client";
import { sendSms } from "./_shared/sms";

const SOCIAL_TOPICS = [
  "Fix your slice with one setup change",
  "Strike the ball first — stop topping and chunking",
  "Practice drill you can do at home in 10 minutes",
  "Why data-driven feedback beats guesswork",
  "Junior golf season is here — start with fundamentals",
  "Online lessons work — here's how",
  "Break through your scoring plateau",
  "Short game wins rounds",
  "Grip pressure matters more than you think",
  "Spring tune-up for your golf game",
  "Women's golf league — golf is for everyone",
  "Book your intro lesson this week",
];

export default async () => {
  try {
    const db = getDb();
    const coaches = await db
      .select()
      .from(schema.coaches)
      .where(eq(schema.coaches.active, true));

    let queued = 0;

    for (const coach of coaches) {
      if (coach.tier === "core") continue;

      const topic = SOCIAL_TOPICS[Math.floor(Math.random() * SOCIAL_TOPICS.length)];
      const postBody = `${topic} — ${coach.name} in ${coach.city}. Book your intro lesson today.`;

      const [item] = await db
        .insert(schema.contentQueue)
        .values({
          coachId: coach.id,
          type: "social",
          title: topic,
          body: postBody,
          status: "pending_approval",
          scheduledFor: nextWeekday(),
        })
        .returning();

      if (coach.phone && item) {
        await sendSms(
          coach.phone,
          coach.twilioNumber ?? process.env.TWILIO_FROM_NUMBER ?? "",
          `[EJS Blueprint] Approve this week's post?\n\n"${postBody}"\n\nReply 1 to approve, 2 to skip.`,
        );
        await db
          .update(schema.contentQueue)
          .set({ approvalSmsSent: true })
          .where(eq(schema.contentQueue.id, item.id));
      }

      if (coach.tier === "growth" || coach.tier === "amplify") {
        const blogTitle = `How to Improve Your Golf Game in ${coach.city}`;
        await db.insert(schema.contentQueue).values({
          coachId: coach.id,
          type: "blog",
          title: blogTitle,
          body: `<p>${coach.name} shares practical tips for golfers in ${coach.city} looking to lower scores and build consistency.</p>`,
          status: "draft",
        });
      }

      queued++;
    }

    return json({ ok: true, coachesProcessed: queued });
  } catch (err) {
    console.error("content-generate error:", err);
    return json({ error: "Content generation failed" }, 500);
  }
};

function nextWeekday() {
  const d = new Date();
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  d.setHours(10, 0, 0, 0);
  return d;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  schedule: "@monthly",
};
