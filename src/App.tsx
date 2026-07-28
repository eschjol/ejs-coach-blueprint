import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookIntro from "./pages/BookIntro";
import BookThanks from "./pages/BookThanks";
import CoachDashboard from "./pages/CoachDashboard";
import SeoLanding from "./pages/SeoLanding";
import BetaProgram from "./pages/BetaProgram";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:coachSlug" element={<BookIntro />} />
      <Route path="/book/:coachSlug/thanks" element={<BookThanks />} />
      <Route path="/dashboard/:coachSlug" element={<CoachDashboard />} />
      <Route path="/golf/:coachSlug/:pageSlug" element={<SeoLanding />} />
      <Route path="/beta" element={<BetaProgram />} />
    </Routes>
  );
}
