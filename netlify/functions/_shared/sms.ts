import type { Coach, Student } from "@db/schema";

export async function generateAiReply(
  coach: Coach,
  student: Student | null,
  inboundMessage: string,
  bookingUrl: string,
): Promise<string> {
  const gatewayUrl =
    process.env.AI_GATEWAY_URL ??
    "https://api.netlify.com/v1/ai/gateway/openai/chat/completions";

  const apiKey = process.env.AI_GATEWAY_API_KEY ?? process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return fallbackReply(coach, bookingUrl, inboundMessage);
  }

  const { buildSmsUserPrompt, SMS_SYSTEM_PROMPT } = await import("./prompts");

  const userPrompt = buildSmsUserPrompt({
    coachName: coach.name,
    city: coach.city,
    venueName: coach.venueName ?? undefined,
    introPrice:
      coach.introLessonPriceCents === 0
        ? "Free intro lesson"
        : `$${(coach.introLessonPriceCents! / 100).toFixed(0)}`,
    privatePrice: `$${(coach.privateLessonPriceCents! / 100).toFixed(0)}`,
    bookingUrl,
    studentName: student?.firstName,
    packageBalance: student?.packageBalance ?? undefined,
    inboundMessage,
  });

  try {
    const res = await fetch(gatewayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SMS_SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      return fallbackReply(coach, bookingUrl, inboundMessage);
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    return content || fallbackReply(coach, bookingUrl, inboundMessage);
  } catch {
    return fallbackReply(coach, bookingUrl, inboundMessage);
  }
}

function fallbackReply(
  coach: Coach,
  bookingUrl: string,
  message: string,
): string {
  const lower = message.toLowerCase();

  if (
    lower.includes("book") ||
    lower.includes("lesson") ||
    lower.includes("schedule") ||
    lower.includes("available")
  ) {
    return `Hi! This is ${coach.name}'s assistant. Book your intro lesson here: ${bookingUrl}`;
  }

  if (
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("how much")
  ) {
    const intro =
      coach.introLessonPriceCents === 0
        ? "free intro lesson"
        : `$${(coach.introLessonPriceCents! / 100).toFixed(0)} intro`;
    return `${coach.name} offers a ${intro} and private lessons from $${(coach.privateLessonPriceCents! / 100).toFixed(0)}. Book here: ${bookingUrl}`;
  }

  if (
    lower.includes("where") ||
    lower.includes("address") ||
    lower.includes("location")
  ) {
    return `We teach at ${coach.venueName ?? coach.city}${coach.venueAddress ? ` — ${coach.venueAddress}` : ""}. Book: ${bookingUrl}`;
  }

  if (
    lower.includes("coach") ||
    lower.includes("erik") ||
    lower.includes("call me") ||
    lower.includes("speak")
  ) {
    return `Got it — I've notified ${coach.name}. They'll follow up shortly. You can also book directly: ${bookingUrl}`;
  }

  return `Thanks for reaching out to ${coach.name}! Book an intro lesson or ask a question here: ${bookingUrl}`;
}

export async function sendSms(
  to: string,
  from: string,
  body: string,
): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;

  if (!sid || !token) {
    console.log(`[SMS mock] ${from} -> ${to}: ${body}`);
    return true;
  }

  const params = new URLSearchParams({
    To: to,
    From: from,
    Body: body,
  });

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    },
  );

  return res.ok;
}

export function parseTwilioWebhook(
  body: string,
): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(body));
}
