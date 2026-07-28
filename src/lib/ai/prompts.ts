export const SMS_SYSTEM_PROMPT = `You are the AI front desk for a professional golf instructor.
Your job: answer questions, share booking links, and help students schedule intro or private lessons.

Rules:
- Be friendly, concise, and golf-native. 1-3 sentences max for SMS.
- Never diagnose swing faults or give technical coaching advice.
- For pricing, use the coach's provided rates. If unknown, say "Intro lessons start with a free consult" and send booking link.
- For booking, always include the booking URL.
- If asked to speak to the coach directly, say you'll notify them and they'll follow up shortly.
- Never share other students' information.
- Use the student's first name when known.`;

export function buildSmsUserPrompt(context: {
  coachName: string;
  city: string;
  venueName?: string;
  introPrice?: string;
  privatePrice?: string;
  bookingUrl: string;
  studentName?: string;
  packageBalance?: number;
  inboundMessage: string;
}): string {
  return `Coach: ${context.coachName}
City: ${context.city}
Venue: ${context.venueName ?? "local teaching facility"}
Intro lesson: ${context.introPrice ?? "complimentary intro available"}
Private lesson: ${context.privatePrice ?? "contact for pricing"}
Booking URL: ${context.bookingUrl}
Student name: ${context.studentName ?? "unknown"}
Package balance: ${context.packageBalance ?? "unknown"}

Inbound SMS: "${context.inboundMessage}"

Reply as the coach's assistant via SMS.`;
}

export const SEO_PAGE_PROMPT = `Write a local SEO landing page for a golf instructor.
Include: H1 with city and service, 2-3 paragraphs on who it's for, pricing transparency section, FAQ (3 items), and CTA to book intro lesson.
Tone: confident, data-driven, welcoming. No fluff. 400-600 words.
Output JSON: { "title", "metaDescription", "bodyHtml" }`;

export const SOCIAL_POST_PROMPT = `Write a short social media post for a golf coach.
Topic: {topic}
City: {city}
Include one actionable tip. End with soft CTA to book intro lesson.
Max 280 characters. No hashtags unless natural (max 2).`;

export const BLOG_PROMPT = `Write a 600-word local SEO blog post for a golf instructor in {city}.
Topic: {topic}
Include practical tips, mention the coach's data-driven approach, and end with booking CTA.
Output JSON: { "title", "metaDescription", "bodyHtml" }`;
