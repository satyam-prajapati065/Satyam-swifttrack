import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Package,
  Truck,
  Search,
  ShieldCheck,
  LogOut,
  LogIn,
  UserPlus,
  ClipboardList,
} from "lucide-react";
import Modal from "./Modal";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useState({ open: false, type: "", msg: "" });

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user");

    setModal({
      open: true,
      type: "success",
      msg: "Logged out successfully! Redirecting...",
    });

    setTimeout(() => {
      window.location.replace("/");
    }, 3000);
  };

  return (
    <nav className="navbar">
      <div
        className="nav-brand"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <Package size={28} />
        <span>Satyam SwiftTrack</span>
      </div>

      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/track"
          className={location.pathname === "/track" ? "active" : ""}
        >
          <Search size={18} /> Track
        </Link>

        {user ? (
          <>
            <Link
              to="/book"
              className={location.pathname === "/book" ? "active" : ""}
            >
              <Truck size={18} /> Book
            </Link>

            <Link
              to="/history"
              className={location.pathname === "/history" ? "active" : ""}
            >
              <ClipboardList size={18} /> My Orders
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="admin-link-icon"
                style={{ color: "#fbbf24" }}
              >
                <ShieldCheck size={20} /> Admin
              </Link>
            )}

            <div className="account-section">
              <div className="user-profile">
                <div className="avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="logout-btn-nav"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/login" className="nav-auth-btn">
              <LogIn size={18} /> Login
            </Link>
            <Link to="/signup" className="nav-auth-btn signup-special">
              <UserPlus size={18} /> Signup
            </Link>
          </div>
        )}
      </div>

      <Modal
        isOpen={modal.open}
        type={modal.type}
        message={modal.msg}
        onClose={() => setModal({ ...modal, open: false })}
      />
    </nav>
  );
};

export default Navbar;
