import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let client: ReturnType<typeof postgres> | null = null;
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  const url =
    process.env.NETLIFY_DATABASE_URL ?? process.env.DATABASE_URL ?? "";

  if (!url) {
    throw new Error(
      "Database URL not configured. Set NETLIFY_DATABASE_URL or DATABASE_URL.",
    );
  }

  if (!client) {
    client = postgres(url, { prepare: false, max: 1 });
    db = drizzle(client, { schema });
  }

  return db!;
}

export { schema };
