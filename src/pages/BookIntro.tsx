import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { INTRO_FUNNEL } from "../lib/playbook/funnels";

const COACHES: Record<
  string,
  {
    name: string;
    city: string;
    venue: string;
    introPriceCents: number;
  }
> = {
  "erik-schjolberg": {
    name: "Erik Schjolberg",
    city: "Scottsdale",
    venue: "McCormick Ranch Golf Club",
    introPriceCents: 0,
  },
};

function nextAvailableSlots(): string[] {
  const slots: string[] = [];
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(9, 0, 0, 0);

  for (let d = 0; d < 14; d++) {
    const day = new Date(start);
    day.setDate(start.getDate() + d);
    if (day.getDay() === 0) continue;
    for (const hour of [9, 11, 14, 16]) {
      const slot = new Date(day);
      slot.setHours(hour, 0, 0, 0);
      slots.push(slot.toISOString());
    }
  }
  return slots.slice(0, 12);
}

export default function BookIntro() {
  const { coachSlug = "erik-schjolberg" } = useParams();
  const coach = COACHES[coachSlug] ?? COACHES["erik-schjolberg"];
  const slots = nextAvailableSlots();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [scheduledAt, setScheduledAt] = useState(slots[0] ?? "");
  const [handicapRange, setHandicapRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/book-intro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coachSlug,
          firstName,
          lastName,
          email,
          phone,
          scheduledAt,
          handicapRange,
        }),
      });

      const data = (await res.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Booking failed");
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="page-header">
        <div className="container">
          <Link to="/" className="logo">
            EJS <span>Coach Blueprint</span>
          </Link>
        </div>
      </header>

      <main className="container" style={{ padding: "2rem 0 4rem", maxWidth: 640 }}>
        <h1 style={{ fontSize: "2rem", color: "var(--green-900)", marginBottom: "0.5rem" }}>
          {INTRO_FUNNEL.headline}
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
          {coach.name} · {coach.city} · {coach.venue}
        </p>
        <p style={{ marginBottom: "2rem" }}>{INTRO_FUNNEL.subheadline}</p>

        <div className="card">
          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First name *</label>
              <input
                id="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Mobile *</label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="4805551234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="slot">Preferred time *</label>
              <select
                id="slot"
                required
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
              >
                {slots.map((s) => (
                  <option key={s} value={s}>
                    {new Date(s).toLocaleString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="handicap">Skill level</label>
              <select
                id="handicap"
                value={handicapRange}
                onChange={(e) => setHandicapRange(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="beginner">Beginner / high handicap</option>
                <option value="mid">Mid handicap</option>
                <option value="low">Low handicap / competitive</option>
                <option value="junior">Junior golfer</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%" }}>
              {loading
                ? "Booking..."
                : coach.introPriceCents === 0
                  ? INTRO_FUNNEL.cta
                  : `Book — $${(coach.introPriceCents / 100).toFixed(0)}`}
            </button>
          </form>
        </div>

        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>FAQ</h2>
          {INTRO_FUNNEL.faqs.map((faq) => (
            <div key={faq.q} style={{ marginBottom: "1rem" }}>
              <strong>{faq.q}</strong>
              <p style={{ color: "var(--muted)", marginTop: "0.25rem" }}>{faq.a}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
