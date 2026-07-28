import { Link, useParams } from "react-router-dom";

const FALLBACK_PAGES: Record<string, { title: string; body: string; meta: string }> = {
  "golf-lessons-scottsdale": {
    title: "Golf Lessons in Scottsdale | Erik Schjolberg",
    meta: "Book golf lessons in Scottsdale with Erik Schjolberg. Data-driven instruction at McCormick Ranch.",
    body: `<h1>Golf Lessons in Scottsdale</h1>
<p>Work with Erik Schjolberg, Scottsdale's top-rated golf instructor, at McCormick Ranch Golf Club.</p>
<p>Data-driven instruction using Trackman, 3D analysis, and biomechanics-focused coaching for every skill level.</p>
<h2>Who it's for</h2>
<ul><li>Beginners building a solid foundation</li><li>Golfers stuck on a plateau</li><li>Competitive juniors and low handicaps</li></ul>
<p><strong>Book your intro lesson today.</strong></p>`,
  },
};

export default function SeoLanding() {
  const { coachSlug = "erik-schjolberg", pageSlug = "" } = useParams();
  const page = FALLBACK_PAGES[pageSlug] ?? {
    title: `${pageSlug.replace(/-/g, " ")} | Coach`,
    meta: "Local golf instruction",
    body: `<h1>${pageSlug.replace(/-/g, " ")}</h1><p>Book an intro lesson to get started.</p>`,
  };

  return (
    <>
      <header className="page-header">
        <div className="container">
          <Link to="/" className="logo">
            EJS <span>Coach Blueprint</span>
          </Link>
        </div>
      </header>

      <main className="container" style={{ padding: "2rem 0 4rem", maxWidth: 720 }}>
        <article
          className="card"
          style={{ lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link to={`/book/${coachSlug}`} className="btn btn-primary">
            Book Intro Lesson
          </Link>
        </div>
      </main>
    </>
  );
}
