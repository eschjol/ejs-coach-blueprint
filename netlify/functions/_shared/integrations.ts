import Stripe from "stripe";
import type { Coach } from "@db/schema";

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2025-08-27.basil" });
}

export async function createIntroCheckoutSession(
  coach: Coach,
  studentEmail: string,
  studentName: string,
  scheduledAt: string,
  successUrl: string,
  cancelUrl: string,
): Promise<{ sessionId: string; url: string } | { error: string }> {
  const stripe = getStripe();
  if (!stripe) {
    return {
      sessionId: `mock_${Date.now()}`,
      url: `${successUrl}?mock=true&scheduled=${encodeURIComponent(scheduledAt)}`,
    };
  }

  const amount = coach.introLessonPriceCents ?? 0;
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    amount > 0
      ? [
          {
            price_data: {
              currency: "usd",
              unit_amount: amount,
              product_data: {
                name: `Intro Lesson with ${coach.name}`,
                description: `Scheduled: ${new Date(scheduledAt).toLocaleString()}`,
              },
            },
            quantity: 1,
          },
        ]
      : [];

  const session = await stripe.checkout.sessions.create({
    mode: amount > 0 ? "payment" : "setup",
    customer_email: studentEmail,
    line_items: amount > 0 ? lineItems : undefined,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      coachId: coach.id,
      studentName,
      scheduledAt,
      lessonType: "intro",
    },
    ...(coach.stripeAccountId
      ? { payment_intent_data: { transfer_data: { destination: coach.stripeAccountId } } }
      : {}),
  });

  if (!session.url) return { error: "Failed to create checkout session" };
  return { sessionId: session.id, url: session.url };
}

export async function createCalendarEvent(
  coach: Coach,
  summary: string,
  startIso: string,
  durationMinutes: number,
  attendeeEmail?: string,
): Promise<string | null> {
  const accessToken = process.env.GOOGLE_CALENDAR_ACCESS_TOKEN;
  if (!accessToken) {
    console.log(`[Calendar mock] ${summary} at ${startIso}`);
    return `mock_event_${Date.now()}`;
  }

  const start = new Date(startIso);
  const end = new Date(start.getTime() + durationMinutes * 60_000);

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary,
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },
        attendees: attendeeEmail ? [{ email: attendeeEmail }] : [],
      }),
    },
  );

  if (!res.ok) return null;
  const data = (await res.json()) as { id: string };
  return data.id;
}
