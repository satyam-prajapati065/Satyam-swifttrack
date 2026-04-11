import React, { useState, useEffect } from "react";
import axios from "axios";
import { Package, Clock, MapPin, XCircle } from "lucide-react";
import Modal from "./Modal"; 

const UserHistory = () => {
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState({ open: false, type: "", msg: "" });
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = async () => {
    if (user) {
      const res = await axios.get(
        `http://localhost:5000/api/user-orders/${user.email}`,
      );
      setOrders(res.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleCancel = async (trackingId) => {
    try {
      await axios.put(`http://localhost:5000/api/update/${trackingId}`, {
        status: "Cancelled",
      });

      setModal({
        open: true,
        type: "success",
        msg: `Order ${trackingId} has been cancelled successfully.`,
      });

      fetchOrders(); 
    } catch (err) {
      setModal({
        open: true,
        type: "error",
        msg: "Failed to cancel the order. Please try again.",
      });
    }
  };

  return (
    <div className="page-header">
      <div className="card">
        <h2 style={{ color: "var(--primary)", marginBottom: "20px" }}>
          <Package size={24} /> My Booking History
        </h2>
        {orders.length === 0 ? (
          <p>No bookings found. Start by sending your first parcel!</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div
                key={order._id}
                className="stat-card"
                style={{
                  marginBottom: "15px",
                  borderLeft: `5px solid ${order.status === "Cancelled" ? "#ef4444" : "var(--secondary)"}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h4 style={{ margin: 0 }}>ID: {order.trackingId}</h4>
                    <p style={{ fontSize: "12px", color: "#64748b" }}>
                      To: {order.receiverName}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      className={`badge status-${order.status.toLowerCase().replace(/\s/g, "").replace("-", "")}`}
                    >
                      {order.status}
                    </span>

                    {order.status === "Booked" && (
                      <div style={{ marginTop: "8px" }}>
                        <button
                          onClick={() => handleCancel(order.trackingId)}
                          className="cancel-btn-small"
                          title="Cancel Order"
                        >
                          <XCircle size={14} /> Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: "10px", fontSize: "13px" }}>
                  <p>
                    <MapPin size={14} /> {order.address}
                  </p>
                  <p>
                    <Clock size={14} /> Booked on:{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
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

export default UserHistory;
