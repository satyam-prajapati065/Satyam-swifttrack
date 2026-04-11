import React, { useState } from "react";
import axios from "axios";
import {
  Search,
  MapPin,
  Package,
  Clock,
  Truck,
  Bike,
  CheckCircle,
  IndianRupee,
} from "lucide-react";
import Modal from "./Modal";

const Tracking = () => {
  const [trackId, setTrackId] = useState("");
  const [result, setResult] = useState(null);
  const [modal, setModal] = useState({ open: false, type: "", msg: "" });

  const handleTrack = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/track/${trackId}`);
      setResult(res.data);
      setModal({
        open: true,
        type: "success",
        msg: `Order Tracking Details!`,
      });
    } catch {
      setModal({ open: true, type: "error", msg: "Invalid Tracking ID!" });
    }
  };

  return (
    <div className="page-header">
      <div className="card" style={{ maxWidth: "700px", margin: "auto" }}>
        <h2
          style={{
            color: "var(--primary)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Search /> Track Your Parcel
        </h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="custom-input"
            placeholder="Enter Tracking ID (e.g. ST1234)"
            onChange={(e) => setTrackId(e.target.value)}
          />
          <button
            onClick={handleTrack}
            className="primary-btn"
            style={{ width: "150px", height: "45px" }}
          >
            Search
          </button>
        </div>

        {result && (
          <div className="timeline" style={{ marginTop: "30px" }}>
            {/* Step 1: Booked */}
            <div className="timeline-item">
              <div className="timeline-icon">
                <Package size={18} />
              </div>
              <h4 style={{ margin: 0 }}>Order Booked</h4>
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                Package received at origin
              </p>
            </div>

            {/* Step 2: In-Transit */}
            <div
              className="timeline-item"
              style={{ opacity: result.status === "Booked" ? 0.3 : 1 }}
            >
              <div className="timeline-icon">
                <Truck size={18} />
              </div>
              <h4 style={{ margin: 0 }}>In-Transit</h4>
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                On its way to destination warehouse
              </p>
            </div>

            {/* Step 3: Out-for-Delivery */}
            <div
              className="timeline-item"
              style={{
                opacity:
                  result.status === "Out-for-Delivery" ||
                  result.status === "Delivered"
                    ? 1
                    : 0.3,
              }}
            >
              <div className="timeline-icon">
                <Bike size={18} />
              </div>
              <h4 style={{ margin: 0 }}>Out-for-Delivery</h4>
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                Courier partner is arriving at your location
              </p>
            </div>

            {/* Step 4: Delivered */}
            <div
              className="timeline-item"
              style={{ opacity: result.status === "Delivered" ? 1 : 0.3 }}
            >
              <div className="timeline-icon">
                <CheckCircle size={18} />
              </div>
              <h4 style={{ margin: 0 }}>Delivered</h4>
              <p style={{ fontSize: "13px", color: "#64748b" }}>
                Successfully delivered to {result.receiverName}
              </p>
            </div>

            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <strong>
                  <MapPin size={16} color="var(--primary)" /> Location:
                </strong>{" "}
                {result.address}
              </p>
              <p
                style={{
                  margin: "10px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <strong>📍 Status:</strong>
                <span
                  className={`badge status-${result.status.toLowerCase().replace(/\s/g, "").replace("-", "")}`}
                >
                  {result.status}
                </span>
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <strong>
                  <IndianRupee size={16} color="#10b981" /> Paid:
                </strong>{" "}
                ₹{result.cost}
              </p>
            </div>
          </div>
        )}
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

export default Tracking;
