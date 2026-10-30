import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Splash() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Step 1: Wait 3 seconds just showing the normal splash screen
    const splashTimer = setTimeout(() => {
      setLoading(true); // Trigger the loading blur & popup modal
    }, 3000);

    // Step 2: Keep the loading state visible for another 2 seconds, then navigate home
    const navigateTimer = setTimeout(() => {
      navigate("/home"); // Adjust route if needed
    }, 5500); // 3000ms (splash) + 2500ms (loading duration)

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <main className={`splash ${loading ? "is-loading" : ""}`}>
      {/* Background content */}
      <section className="splash__brand" aria-label="Watts Your Bill">
        <div className="splash__mark" aria-hidden="true">
          <svg viewBox="0 0 40 40">
            <path d="M22.8 5.5 10.5 22h8l-1.3 12.5L29.5 18h-8l1.3-12.5Z" />
          </svg>
        </div>
        <h1 className="splash__title">Watts Your Bill?</h1>
      </section>
      <BottomNav />

      {/* Loading Modal Overlay (Appears only after 3 seconds) */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-card">
            <div className="spinner"></div>
            <p>Loading....</p>
          </div>
        </div>
      )}
    </main>
  );
}