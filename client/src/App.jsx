import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Apply from "./pages/Apply";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Reviews from "./pages/Reviews";
import Services from "./pages/Services";
import Team from "./pages/Team";
import ThankYou from "./pages/ThankYou";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uslugi" element={<Services />} />
          <Route path="/kak-eto-rabotaet" element={<HowItWorks />} />
          <Route path="/otzyvy" element={<Reviews />} />
          <Route path="/komanda" element={<Team />} />
          <Route path="/voprosy" element={<Faq />} />
          <Route path="/zayavka" element={<Apply />} />
          <Route path="/zayavka/otpravleno" element={<ThankYou />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
