import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="page-header">
      <section style={heroSection}>
        <h1 style={heroTitle}>
          Fastest & Reliable{" "}
          <span style={{ color: "var(--secondary)" }}>Logistics</span> Solutions
        </h1>
        <p style={heroSub}>
          Satyam SwiftTrack brings the future of courier management to your
          fingertips. Real-time tracking, secure booking, and global reach.
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <button
            className="primary-btn"
            style={{ width: "180px" }}
            onClick={() => navigate("/track")}
          >
            Track Package
          </button>
          {!user && (
            <button
              className="primary-btn"
              style={secondaryBtn}
              onClick={() => navigate("/signup")}
            >
              Get Started <ArrowRight size={18} />
            </button>
          )}
        </div>
      </section>

      <div className="stats-grid" style={{ marginTop: "50px" }}>
        <div className="stat-card" style={{ textAlign: "center" }}>
          <Zap color="var(--secondary)" size={32} style={{ margin: "auto" }} />
          <h4 style={{ margin: "15px 0 5px" }}>Lightning Fast</h4>
          <p style={{ fontSize: "13px", color: "#64748b" }}>
            Instant booking and rapid delivery processing.
          </p>
        </div>
        <div
          className="stat-card"
          style={{ textAlign: "center", borderBottomColor: "#10b981" }}
        >
          <ShieldCheck color="#10b981" size={32} style={{ margin: "auto" }} />
          <h4 style={{ margin: "15px 0 5px" }}>Secure Payments</h4>
          <p style={{ fontSize: "13px", color: "#64748b" }}>
            End-to-end encrypted shipment information.
          </p>
        </div>
        <div
          className="stat-card"
          style={{ textAlign: "center", borderBottomColor: "#f59e0b" }}
        >
          <Globe color="#f59e0b" size={32} style={{ margin: "auto" }} />
          <h4 style={{ margin: "15px 0 5px" }}>Global Reach</h4>
          <p style={{ fontSize: "13px", color: "#64748b" }}>
            Network across all major cities and states.
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles
const heroSection = {
  textAlign: "center",
  padding: "60px 20px",
  background: "linear-gradient(to bottom, #eff6ff, transparent)",
  borderRadius: "24px",
  marginBottom: "40px",
};

const heroTitle = {
  fontSize: "3.5rem",
  fontWeight: "800",
  color: "var(--primary)",
  lineHeight: "1.1",
  marginBottom: "20px",
};

const heroSub = {
  fontSize: "1.2rem",
  color: "#475569",
  maxWidth: "700px",
  margin: "0 auto",
};

const secondaryBtn = {
  width: "180px",
  background: "white",
  color: "var(--primary)",
  border: "2px solid var(--primary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

export default Home;
