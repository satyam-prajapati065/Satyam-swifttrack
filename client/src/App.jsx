import React from "react";
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
import UserHistory from "./components/UserHistory"; // Naya component
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

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
