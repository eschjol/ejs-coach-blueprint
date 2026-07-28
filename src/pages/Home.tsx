import { Link } from "react-router-dom";
import { BRAND, TIERS, SETUP_FEE } from "../lib/playbook/brand";

export default function Home() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <Link to="/" className="logo">
            EJS <span>Coach Blueprint</span>
          </Link>
          <nav>
            <Link to="/book/erik-schjolberg" className="btn btn-secondary" style={{ color: "white", borderColor: "white" }}>
              Book Intro Lesson
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero container">
          <h1>{BRAND.tagline}</h1>
          <p>
            AI-powered scheduling, marketing, SEO, and ads — built for golf coaches who'd rather teach than manage software.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/book/erik-schjolberg" className="btn btn-primary">
              See the booking funnel
            </Link>
            <Link to="/beta" className="btn btn-secondary">
              Join beta program
            </Link>
          </div>
        </section>

        <section className="container grid-3">
          {Object.entries(TIERS).map(([key, tier]) => (
            <div key={key} className="card tier-card">
              <h3>{tier.name}</h3>
              <div className="price">${tier.priceMonthly}/mo</div>
              <ul>
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="container" style={{ marginBottom: "3rem" }}>
          <div className="card">
            <h2 style={{ marginBottom: "0.75rem", color: "var(--green-900)" }}>
              White-glove setup — ${SETUP_FEE} one-time
            </h2>
            <p style={{ color: "var(--muted)" }}>
              60-minute onboarding call. We connect your calendar, payments, Google listing, and phone line.
              You teach golf — the system handles the rest.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          © {new Date().getFullYear()} {BRAND.name} · Powered by {BRAND.owner}
        </div>
      </footer>
    </>
  );
}
