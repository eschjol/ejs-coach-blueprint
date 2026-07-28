import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const tierEnum = pgEnum("tier", ["core", "growth", "amplify"]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
]);
export const contentStatusEnum = pgEnum("content_status", [
  "draft",
  "pending_approval",
  "approved",
  "published",
  "skipped",
]);

export const coaches = pgTable("coaches", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  city: text("city").notNull(),
  state: text("state").notNull().default("AZ"),
  venueName: text("venue_name"),
  venueAddress: text("venue_address"),
  bio: text("bio"),
  tier: tierEnum("tier").notNull().default("core"),
  stripeAccountId: text("stripe_account_id"),
  googleCalendarId: text("google_calendar_id"),
  googleReviewUrl: text("google_review_url"),
  twilioNumber: text("twilio_number"),
  introLessonPriceCents: integer("intro_lesson_price_cents").default(0),
  privateLessonPriceCents: integer("private_lesson_price_cents").default(15000),
  timezone: text("timezone").default("America/Phoenix"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const students = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),
  coachId: uuid("coach_id")
    .notNull()
    .references(() => coaches.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone").notNull(),
  handicapRange: text("handicap_range"),
  packageBalance: integer("package_balance").default(0),
  lastLessonAt: timestamp("last_lesson_at"),
  googleReviewLeft: boolean("google_review_left").default(false),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  coachId: uuid("coach_id")
    .notNull()
    .references(() => coaches.id),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id),
  lessonType: text("lesson_type").notNull().default("intro"),
  status: bookingStatusEnum("status").notNull().default("pending"),
  scheduledAt: timestamp("scheduled_at").notNull(),
  durationMinutes: integer("duration_minutes").default(60),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  amountCents: integer("amount_cents"),
  reminderSent24h: boolean("reminder_sent_24h").default(false),
  reminderSent2h: boolean("reminder_sent_2h").default(false),
  reviewRequested: boolean("review_requested").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  coachId: uuid("coach_id")
    .notNull()
    .references(() => coaches.id),
  studentId: uuid("student_id").references(() => students.id),
  phone: text("phone").notNull(),
  direction: text("direction").notNull(),
  body: text("body").notNull(),
  aiGenerated: boolean("ai_generated").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contentQueue = pgTable("content_queue", {
  id: uuid("id").primaryKey().defaultRandom(),
  coachId: uuid("coach_id")
    .notNull()
    .references(() => coaches.id),
  type: text("type").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  status: contentStatusEnum("status").notNull().default("draft"),
  scheduledFor: timestamp("scheduled_for"),
  approvalSmsSent: boolean("approval_sms_sent").default(false),
  metadata: jsonb("metadata").$type<Record<string, string>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const seoPages = pgTable("seo_pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  coachId: uuid("coach_id")
    .notNull()
    .references(() => coaches.id),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  metaDescription: text("meta_description").notNull(),
  service: text("service").notNull(),
  city: text("city").notNull(),
  bodyHtml: text("body_html").notNull(),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const metricsSnapshots = pgTable("metrics_snapshots", {
  id: uuid("id").primaryKey().defaultRandom(),
  coachId: uuid("coach_id")
    .notNull()
    .references(() => coaches.id),
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  newLeads: integer("new_leads").default(0),
  bookings: integer("bookings").default(0),
  reviews: integer("reviews").default(0),
  revenueCents: integer("revenue_cents").default(0),
  aiReplies: integer("ai_replies").default(0),
  reportSent: boolean("report_sent").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Coach = typeof coaches.$inferSelect;
export type Student = typeof students.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
