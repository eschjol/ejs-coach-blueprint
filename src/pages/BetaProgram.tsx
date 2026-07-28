import { Link } from "react-router-dom";
import { BRAND } from "../lib/playbook/brand";

export default function BetaProgram() {
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
        <h1 style={{ color: "var(--green-900)", marginBottom: "1rem" }}>
          Beta Coach Program
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
          We're onboarding 5–10 golf coaches for the EJS Coach Blueprint beta.
          White-glove setup included. Ideal for coaches 40+ who want marketing and admin off their plate.
        </p>

        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ marginBottom: "0.75rem" }}>Beta includes</h3>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--muted)" }}>
            <li>Full platform setup (booking, SMS AI, reminders, reviews)</li>
            <li>Local SEO pages for your city and services</li>
            <li>50% off first 3 months ($149 → $75/mo Growth tier)</li>
            <li>Case study feature (optional)</li>
          </ul>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "0.75rem" }}>Apply</h3>
          <p style={{ marginBottom: "1rem", color: "var(--muted)" }}>
            Email {BRAND.ownerEmail} with:
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
            <li>Your name and city</li>
            <li>Where you teach</li>
            <li>Biggest admin/marketing headache today</li>
            <li>Current tools you use (Calendly, CoachNow, etc.)</li>
          </ul>
          <a href={`mailto:${BRAND.ownerEmail}?subject=EJS Coach Blueprint Beta Application`} className="btn btn-primary">
            Apply via email
          </a>
        </div>

        <p style={{ marginTop: "2rem", fontSize: "0.875rem", color: "var(--muted)" }}>
          Target partners: Proponent Group members, PGA teaching pros, TrackMan instructors.
        </p>
      </main>
    </>
  );
}
