-- Initial migration for EJS Coach Blueprint
-- Run via: npm run db:migrate (requires NETLIFY_DATABASE_URL)

CREATE TYPE "tier" AS ENUM ('core', 'growth', 'amplify');
CREATE TYPE "booking_status" AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');
CREATE TYPE "content_status" AS ENUM ('draft', 'pending_approval', 'approved', 'published', 'skipped');

CREATE TABLE IF NOT EXISTS "coaches" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "city" text NOT NULL,
  "state" text DEFAULT 'AZ' NOT NULL,
  "venue_name" text,
  "venue_address" text,
  "bio" text,
  "tier" "tier" DEFAULT 'core' NOT NULL,
  "stripe_account_id" text,
  "google_calendar_id" text,
  "google_review_url" text,
  "twilio_number" text,
  "intro_lesson_price_cents" integer DEFAULT 0,
  "private_lesson_price_cents" integer DEFAULT 15000,
  "timezone" text DEFAULT 'America/Phoenix',
  "active" boolean DEFAULT true,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "students" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "coach_id" uuid NOT NULL REFERENCES "coaches"("id"),
  "first_name" text NOT NULL,
  "last_name" text,
  "email" text,
  "phone" text NOT NULL,
  "handicap_range" text,
  "package_balance" integer DEFAULT 0,
  "last_lesson_at" timestamp,
  "google_review_left" boolean DEFAULT false,
  "tags" jsonb DEFAULT '[]',
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "bookings" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "coach_id" uuid NOT NULL REFERENCES "coaches"("id"),
  "student_id" uuid NOT NULL REFERENCES "students"("id"),
  "lesson_type" text DEFAULT 'intro' NOT NULL,
  "status" "booking_status" DEFAULT 'pending' NOT NULL,
  "scheduled_at" timestamp NOT NULL,
  "duration_minutes" integer DEFAULT 60,
  "stripe_payment_intent_id" text,
  "amount_cents" integer,
  "reminder_sent_24h" boolean DEFAULT false,
  "reminder_sent_2h" boolean DEFAULT false,
  "review_requested" boolean DEFAULT false,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "conversations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "coach_id" uuid NOT NULL REFERENCES "coaches"("id"),
  "student_id" uuid REFERENCES "students"("id"),
  "phone" text NOT NULL,
  "direction" text NOT NULL,
  "body" text NOT NULL,
  "ai_generated" boolean DEFAULT false,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "content_queue" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "coach_id" uuid NOT NULL REFERENCES "coaches"("id"),
  "type" text NOT NULL,
  "title" text NOT NULL,
  "body" text NOT NULL,
  "status" "content_status" DEFAULT 'draft' NOT NULL,
  "scheduled_for" timestamp,
  "approval_sms_sent" boolean DEFAULT false,
  "metadata" jsonb,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "seo_pages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "coach_id" uuid NOT NULL REFERENCES "coaches"("id"),
  "slug" text NOT NULL,
  "title" text NOT NULL,
  "meta_description" text NOT NULL,
  "service" text NOT NULL,
  "city" text NOT NULL,
  "body_html" text NOT NULL,
  "published" boolean DEFAULT true,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "metrics_snapshots" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "coach_id" uuid NOT NULL REFERENCES "coaches"("id"),
  "period_start" timestamp NOT NULL,
  "period_end" timestamp NOT NULL,
  "new_leads" integer DEFAULT 0,
  "bookings" integer DEFAULT 0,
  "reviews" integer DEFAULT 0,
  "revenue_cents" integer DEFAULT 0,
  "ai_replies" integer DEFAULT 0,
  "report_sent" boolean DEFAULT false,
  "created_at" timestamp DEFAULT now() NOT NULL
);

-- Seed Erik Schjolberg (dogfood)
INSERT INTO "coaches" (
  "slug", "name", "email", "phone", "city", "state",
  "venue_name", "venue_address", "bio", "tier",
  "google_review_url", "intro_lesson_price_cents", "private_lesson_price_cents"
) VALUES (
  'erik-schjolberg',
  'Erik Schjolberg',
  'erik@ejsgolf.com',
  '4808619370',
  'Scottsdale',
  'AZ',
  'McCormick Ranch Golf Club',
  '7505 E McCormick Pkwy, Scottsdale, AZ',
  'Scottsdale''s #1 rated golf instructor. Data-driven instruction with Trackman, 3D analysis, and biomechanics-focused coaching.',
  'amplify',
  'https://g.page/r/ejsgolf/review',
  0,
  15000
) ON CONFLICT ("slug") DO NOTHING;
