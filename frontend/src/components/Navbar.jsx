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
  Menu, // Hamburger icon
  X, // Close icon
} from "lucide-react";
import Modal from "./Modal";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useState({ open: false, type: "", msg: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu state

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

  // Mobile par link click hone par menu apne aap band ho jaye
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div
        className="nav-brand"
        onClick={() => {
          navigate("/");
          closeMenu();
        }}
        style={{ cursor: "pointer" }}
      >
        <Package size={28} />
        <span>Satyam SwiftTrack</span>
      </div>

      {/* --- Mobile Menu Button --- */}
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* --- Nav Links Container --- */}
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="/track"
          className={location.pathname === "/track" ? "active" : ""}
          onClick={closeMenu}
        >
          <Search size={18} /> Track
        </Link>

        {user ? (
          <>
            <Link
              to="/book"
              className={location.pathname === "/book" ? "active" : ""}
              onClick={closeMenu}
            >
              <Truck size={18} /> Book
            </Link>

            <Link
              to="/history"
              className={location.pathname === "/history" ? "active" : ""}
              onClick={closeMenu}
            >
              <ClipboardList size={18} /> My Orders
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="admin-link-icon"
                style={{ color: "#fbbf24" }}
                onClick={closeMenu}
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
          <div className="auth-flex">
            <Link to="/login" className="nav-auth-btn login-special" onClick={closeMenu}>
              <LogIn size={18} /> Login
            </Link>
            <Link
              to="/signup"
              className="nav-auth-btn signup-special"
              onClick={closeMenu}
            >
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
