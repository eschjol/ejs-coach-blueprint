import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface DashboardData {
  coach: string;
  pages: { slug: string; title: string; service: string; city: string }[];
}

export default function CoachDashboard() {
  const { coachSlug = "erik-schjolberg" } = useParams();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/seo-pages?slug=${coachSlug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("Failed to load dashboard"));
  }, [coachSlug]);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <Link to="/" className="logo">
            EJS <span>Coach Blueprint</span>
          </Link>
        </div>
      </header>

      <main className="container" style={{ padding: "2rem 0 4rem" }}>
        <h1 style={{ color: "var(--green-900)", marginBottom: "0.5rem" }}>Coach Dashboard</h1>
        <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
          Plain-English view for {coachSlug}. Monthly SMS reports sent automatically.
        </p>

        <div className="grid-3" style={{ marginTop: 0 }}>
          <div className="card">
            <h3>AI Front Desk</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>
              SMS replies, missed-call text-back, and booking links active on your business line.
            </p>
          </div>
          <div className="card">
            <h3>Review Engine</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>
              Post-lesson review requests fire automatically after completed lessons.
            </p>
          </div>
          <div className="card">
            <h3>Content Queue</h3>
            <p style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>
              Approve social posts via SMS: Reply 1 to approve, 2 to skip.
            </p>
          </div>
        </div>

        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>SEO Landing Pages</h2>
          {error && <div className="error">{error}</div>}
          {!data && !error && <p style={{ color: "var(--muted)" }}>Loading...</p>}
          {data?.pages.length === 0 && (
            <p style={{ color: "var(--muted)" }}>
              No SEO pages yet. Run the weekly SEO generator job after database setup.
            </p>
          )}
          <ul style={{ listStyle: "none" }}>
            {data?.pages.map((p) => (
              <li key={p.slug} className="card" style={{ marginBottom: "0.75rem" }}>
                <Link to={`/golf/${coachSlug}/${p.slug}`}>{p.title}</Link>
                <div style={{ fontSize: "0.875rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                  {p.service} · {p.city}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
