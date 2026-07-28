import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { getDb, schema } from "../../db/client";

export default async (req: Request) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return json({ error: "slug required" }, 400);
  }

  try {
    const db = getDb();
    const pages = await db
      .select()
      .from(schema.seoPages)
      .innerJoin(schema.coaches, eq(schema.seoPages.coachId, schema.coaches.id))
      .where(eq(schema.coaches.slug, slug));

    return json({
      coach: slug,
      pages: pages.map((row) => ({
        slug: row.seo_pages.slug,
        title: row.seo_pages.title,
        metaDescription: row.seo_pages.metaDescription,
        service: row.seo_pages.service,
        city: row.seo_pages.city,
      })),
    });
  } catch (err) {
    console.error("seo-pages error:", err);
    return json({ error: "Failed to load SEO pages" }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export const config: Config = {
  path: "/seo-pages",
};
