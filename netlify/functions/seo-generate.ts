import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { getDb, schema } from "../../db/client";
import { sendSms } from "./_shared/sms";

const SEO_SERVICES = [
  "golf-lessons",
  "junior-golf-lessons",
  "beginner-golf-lessons",
  "private-golf-lessons",
  "online-golf-lessons",
  "slice-fix-lessons",
  "playing-lessons",
  "group-golf-clinics",
] as const;

export default async () => {
  try {
    const db = getDb();
    const allCoaches = await db
      .select()
      .from(schema.coaches)
      .where(eq(schema.coaches.active, true));

    let created = 0;

    for (const coach of allCoaches) {
      if (coach.tier === "core") continue;

      for (const service of SEO_SERVICES) {
        const slug = `${service}-${coach.city.toLowerCase().replace(/\s+/g, "-")}`;
        const serviceLabel = service.replace(/-/g, " ");
        const title = `${capitalize(serviceLabel)} in ${coach.city} | ${coach.name}`;
        const metaDescription = `Book ${serviceLabel} in ${coach.city} with ${coach.name}. Data-driven instruction, intro lessons available, and packages for every skill level.`;
        const bodyHtml = renderSeoBody(coach.name, coach.city, serviceLabel, coach.venueName, coach.venueAddress);

        const existing = await db
          .select()
          .from(schema.seoPages)
          .where(eq(schema.seoPages.slug, slug))
          .limit(1);

        if (existing.length > 0) continue;

        await db.insert(schema.seoPages).values({
          coachId: coach.id,
          slug,
          title,
          metaDescription,
          service: serviceLabel,
          city: coach.city,
          bodyHtml,
        });
        created++;
      }
    }

    return json({ ok: true, pagesCreated: created });
  } catch (err) {
    console.error("seo-generate error:", err);
    return json({ error: "SEO generation failed" }, 500);
  }
};

function renderSeoBody(
  coachName: string,
  city: string,
  service: string,
  venue?: string | null,
  address?: string | null,
): string {
  return `
    <section>
      <h1>${capitalize(service)} in ${city}</h1>
      <p>Work with ${coachName}, a data-driven golf instructor serving ${city} and surrounding areas.</p>
      <p>Whether you're a beginner building fundamentals or a competitive player breaking through a plateau, every session is tailored to your goals with clear feedback and drills you can use between lessons.</p>
      <h2>What to expect</h2>
      <ul>
        <li>Intro lesson to assess your game and build a plan</li>
        <li>Biomechanics-focused instruction with modern technology</li>
        <li>Video and drill follow-up so improvement continues at home</li>
      </ul>
      <h2>Location</h2>
      <p>${venue ?? "Local teaching facility"}${address ? ` — ${address}` : ""}</p>
      <h2>Pricing</h2>
      <p>Intro lessons available — book online for current rates and package options.</p>
    </section>
  `.trim();
}

function capitalize(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  schedule: "@weekly",
};
