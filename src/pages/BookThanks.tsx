import { Link, useParams, useSearchParams } from "react-router-dom";
import { INTRO_FUNNEL } from "../lib/playbook/funnels";

export default function BookThanks() {
  const { coachSlug = "erik-schjolberg" } = useParams();
  const [params] = useSearchParams();
  const bookingId = params.get("booking");

  return (
    <>
      <header className="page-header">
        <div className="container">
          <Link to="/" className="logo">
            EJS <span>Coach Blueprint</span>
          </Link>
        </div>
      </header>

      <main className="container" style={{ padding: "3rem 0", maxWidth: 560, textAlign: "center" }}>
        <div className="success" style={{ marginBottom: "1.5rem" }}>
          You're booked! Check your email for confirmation.
        </div>
        <h1 style={{ color: "var(--green-900)", marginBottom: "1rem" }}>What happens next</h1>
        <ol style={{ textAlign: "left", color: "var(--muted)", marginBottom: "2rem", paddingLeft: "1.25rem" }}>
          {INTRO_FUNNEL.steps.map((step) => (
            <li key={step.title} style={{ marginBottom: "0.75rem" }}>
              <strong style={{ color: "var(--text)" }}>{step.title}</strong> — {step.description}
            </li>
          ))}
        </ol>
        {bookingId && (
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
            Booking reference: {bookingId.slice(0, 8)}...
          </p>
        )}
        <Link to={`/book/${coachSlug}`} className="btn btn-secondary">
          Book another time
        </Link>
      </main>
    </>
  );
}
