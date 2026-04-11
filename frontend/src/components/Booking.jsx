import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Truck, ArrowRight, User, MapPin, Weight } from "lucide-react";
import Modal from "./Modal";

const Booking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderName: "",
    receiverName: "",
    weight: "",
    address: "",
  });
  const [modal, setModal] = useState({ open: false, type: "", msg: "" });

  const handleBook = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setModal({ open: true, type: "error", msg: "Please login first!" });
      return;
    }

    try {
      const res = await axios.post(
        "https://satyam-swifttrack.onrender.com/api/book",
        {
          ...formData,
          userEmail: user.email,
        },
      );
      setModal({
        open: true,
        type: "success",
        msg: `Booking Confirmed! Tracking ID: ${res.data.trackingId}`,
      });
    } catch (err) {
      setModal({
        open: true,
        type: "error",
        msg: "Booking Failed. Please check backend.",
      });
    }
  };

  const closeModal = () => {
    setModal({ ...modal, open: false });
    if (modal.type === "success") navigate("/history");
  };

  return (
    <div className="page-header">
      <div className="card" style={{ maxWidth: "900px", margin: "auto" }}>
        <h2
          style={{
            color: "var(--primary)",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <Truck size={28} /> Courier Booking
        </h2>
        <form onSubmit={handleBook} className="booking-form">
          <div className="input-row-flex">
            <div className="input-with-icon">
              <User size={18} className="field-icon book-icon" />
              <input
                className="custom-input no-margin"
                placeholder="Sender Name"
                onChange={(e) =>
                  setFormData({ ...formData, senderName: e.target.value })
                }
                required
              />
            </div>
            <div className="arrow-container">
              <ArrowRight className="route-arrow-flex" />
            </div>
            <div className="input-with-icon">
              <User size={18} className="field-icon book-icon" />
              <input
                className="custom-input no-margin"
                placeholder="Receiver Name"
                onChange={(e) =>
                  setFormData({ ...formData, receiverName: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div className="input-with-icon" style={{ gridColumn: "span 2" }}>
              <MapPin size={18} className="field-icon book-icon" />
              <input
                className="custom-input no-margin"
                placeholder="Full Delivery Address"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>
            <div className="input-with-icon">
              <Weight size={18} className="field-icon book-icon" />
              <input
                className="custom-input no-margin"
                type="number"
                placeholder="Weight (KG)"
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                required
              />
            </div>
            <button className="primary-btn" style={{ height: "3.2rem" }}>
              Book Now
            </button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modal.open}
        type={modal.type}
        message={modal.msg}
        onClose={closeModal}
      />
    </div>
  );
};

export default Booking;
