import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Booking from "./components/Booking";
import Tracking from "./components/Tracking";
import AdminDashboard from "./components/AdminDashboard";
import UserHistory from "./components/UserHistory";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
        <h2 style={{ color: "#1e40ef", marginTop: "20px" }}>
          Satyam SwiftTech Loading...
        </h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />

        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<Tracking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/book"
              element={user ? <Booking /> : <Navigate to="/login" />}
            />
            <Route
              path="/history"
              element={user ? <UserHistory /> : <Navigate to="/login" />}
            />

            <Route
              path="/admin"
              element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
