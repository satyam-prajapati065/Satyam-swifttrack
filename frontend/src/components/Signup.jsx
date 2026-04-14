import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Modal from "./Modal";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [modal, setModal] = useState({ open: false, type: "", msg: "" });
  const navigate = useNavigate();

  // Strong Password Checks
  const validations = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[@$!%*?&]/.test(formData.password),
  };

  const isAllValid = Object.values(validations).every(Boolean);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isAllValid) return; // Button disabled rahega fir bhi safety ke liye

    if (formData.password !== formData.confirmPassword) {
      setModal({ open: true, type: "error", msg: "Passwords do not match!" });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://satyam-swifttrack.onrender.com/api/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      );
      setModal({
        open: true,
        type: "success",
        msg: "Account Created! Redirecting...",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setModal({
        open: true,
        type: "error",
        msg: err.response?.data?.message || "Signup Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-header">
      <div className="card" style={{ maxWidth: "450px", margin: "auto" }}>
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
            <UserPlus color="#1e40af" size={30} />
          </div>
          <h2 style={{ color: "var(--primary)" }}>Create Account</h2>
        </div>

        <form onSubmit={handleSignup}>
          <div className="input-with-icon">
            <User size={18} className="field-icon" />
            <input
              className="custom-input"
              placeholder="Full Name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          <div className="input-with-icon">
            <Mail size={18} className="field-icon" />
            <input
              className="custom-input"
              type="email"
              placeholder="Email Address"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div
            className="input-with-icon"
            style={{ position: "relative", marginBottom: "5px" }}
          >
            <Lock size={18} className="field-icon" />
            <input
              className="custom-input"
              type={showPass ? "text" : "password"}
              placeholder="Set Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              disabled={loading}
            />
            <div
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute",
                right: "15px",
                top: "12px",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* Real-time Validation UI */}
          <div style={{ marginBottom: "15px", padding: "0 5px" }}>
            <div
              style={{
                fontSize: "12px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "5px",
              }}
            >
              <span
                style={{
                  color: validations.length ? "#166534" : "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {validations.length ? (
                  <CheckCircle2 size={12} />
                ) : (
                  <XCircle size={12} />
                )}{" "}
                8+ Characters
              </span>
              <span
                style={{
                  color: validations.upper ? "#166534" : "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {validations.upper ? (
                  <CheckCircle2 size={12} />
                ) : (
                  <XCircle size={12} />
                )}{" "}
                Uppercase Letter
              </span>
              <span
                style={{
                  color: validations.number ? "#166534" : "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {validations.number ? (
                  <CheckCircle2 size={12} />
                ) : (
                  <XCircle size={12} />
                )}{" "}
                One Number
              </span>
              <span
                style={{
                  color: validations.special ? "#166534" : "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {validations.special ? (
                  <CheckCircle2 size={12} />
                ) : (
                  <XCircle size={12} />
                )}{" "}
                Special Char (@$!)
              </span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="input-with-icon" style={{ position: "relative" }}>
            <ShieldCheck size={18} className="field-icon" />
            <input
              className="custom-input"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              disabled={loading}
            />
            <div
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              style={{
                position: "absolute",
                right: "15px",
                top: "12px",
                cursor: "pointer",
                color: "#64748b",
              }}
            >
              {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* Matching Check Message */}
          {formData.confirmPassword && (
            <p
              style={{
                fontSize: "12px",
                marginTop: "-10px",
                marginBottom: "15px",
                color:
                  formData.password === formData.confirmPassword
                    ? "#166534"
                    : "#ef4444",
                paddingLeft: "5px",
              }}
            >
              {formData.password === formData.confirmPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </p>
          )}

          <button
            className="primary-btn"
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              opacity: loading || !isAllValid ? 0.7 : 1,
              cursor: loading || !isAllValid ? "not-allowed" : "pointer",
            }}
            disabled={loading || !isAllValid}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Processing...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "var(--primary)", fontWeight: "600" }}
          >
            Login Here
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

export default Signup;
