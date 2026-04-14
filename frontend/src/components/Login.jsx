import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react"; // Icons add kiye
import Modal from "./Modal";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [modal, setModal] = useState({ open: false, type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://satyam-swifttrack.onrender.com/api/auth/login",
        credentials,
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      setModal({
        open: true,
        type: "success",
        msg: `Welcome back, ${res.data.name}!`,
      });
      setTimeout(() => window.location.replace("/"), 1500);
    } catch {
      setModal({ open: true, type: "error", msg: "Invalid Email or Password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-header">
      <div className="card" style={{ maxWidth: "400px", margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            className="status-delivered"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px",
            }}
          >
            <LogIn color="#1e40af" size={30} />
          </div>
          <h2 style={{ color: "var(--primary)" }}>User Login</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-with-icon">
            <Mail size={18} className="field-icon" />
            <input
              className="custom-input"
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          <div className="input-with-icon" style={{ position: "relative" }}>
            <Lock size={18} className="field-icon" />
            <input
              className="custom-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
              disabled={loading}
            />
            {/* Toggle Button */}
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "12px",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <button
            className="primary-btn"
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Processing...
              </>
            ) : (
              "Login to Account"
            )}
          </button>
        </form>
        {/* Signup Link */}
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "var(--primary)", fontWeight: "600" }}
          >
            Signup Now
          </Link>
        </p>
      </div>
      <Modal
        isOpen={modal.open}
        type={modal.type}
        message={modal.msg}
        onClose={() => setModal({ ...modal, open: false })}
      />
    </div>
  );
};

export default Login;
