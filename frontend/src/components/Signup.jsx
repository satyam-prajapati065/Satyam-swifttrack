import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ShieldCheck } from "lucide-react";
import Modal from "./Modal";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [modal, setModal] = useState({ open: false, type: "", msg: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setModal({ open: true, type: "error", msg: "Passwords do not match!" });
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setModal({
        open: true,
        type: "success",
        msg: "Account Created Successfully! redirecting to login...",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setModal({
        open: true,
        type: "error",
        msg: err.response?.data?.message || "Signup Failed",
      });
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
            />
          </div>
          <div className="input-with-icon">
            <Lock size={18} className="field-icon" />
            <input
              className="custom-input"
              type="password"
              placeholder="Set Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <div className="input-with-icon">
            <ShieldCheck size={18} className="field-icon" />
            <input
              className="custom-input"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>
          <button className="primary-btn" style={{ marginTop: "10px" }}>
            Sign Up
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
