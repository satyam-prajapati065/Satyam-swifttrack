import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  IndianRupee,
  Package,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Truck,
  CheckCircle,
  Bike,
  XCircle, // Cancelled icon ke liye
} from "lucide-react";
import Modal from "./Modal";

const AdminDashboard = () => {
  const [allData, setAllData] = useState([]);
  const [modal, setModal] = useState({ open: false, type: "", msg: "" });
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchData = async () => {
    setIsSyncing(true);
    try {
      const res = await axios.get(
        "https://satyam-swifttrack.onrender.com/api/admin/all",
      );
      setAllData(res.data);
      setTimeout(() => setIsSyncing(false), 800);
    } catch {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // UPDATE: Total Revenue logic (Only count Non-Cancelled orders)
  const totalRevenue = allData
    .filter((item) => item.status !== "Cancelled") // Cancelled orders ko bahar nikaalo
    .reduce((acc, curr) => acc + (curr.cost || 0), 0);

  return (
    <div className="page-header">
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: 0,
          }}
        >
          <ShieldCheck size={32} color="var(--primary)" /> Admin Dashboard
        </h2>
        <button
          className="primary-btn"
          style={{
            width: "auto",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={fetchData}
          disabled={isSyncing}
        >
          <span
            style={{ display: "flex" }}
            className={isSyncing ? "spin-animation" : ""}
          >
            <RefreshCw size={18} />
          </span>
          {isSyncing ? "Syncing..." : "Sync Data"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <Package color="#1e40af" size={24} />
          <h3 style={{ margin: "10px 0 5px 0" }}>{allData.length}</h3>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Total Shipments</p>
        </div>
        <div className="stat-card" style={{ borderBottomColor: "#10b981" }}>
          <IndianRupee color="#10b981" size={24} />
          <h3 style={{ margin: "10px 0 5px 0" }}>₹{totalRevenue}</h3>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Active Revenue</p>
        </div>
        <div className="stat-card" style={{ borderBottomColor: "#f59e0b" }}>
          <Users color="#f59e0b" size={24} />
          <h3 style={{ margin: "10px 0 5px 0" }}>
            {new Set(allData.map((d) => d.senderName)).size}
          </h3>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Unique Customers</p>
        </div>
      </div>

      <div className="card" style={{ padding: "0", marginTop: "30px" }}>
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Truck size={22} color="var(--primary)" />
          <h3 style={{ margin: 0 }}>Live Shipment Management</h3>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Details</th>
              <th>Price</th> {/* Naya Column */}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((item) => (
              <tr
                key={item._id}
                style={{ opacity: item.status === "Cancelled" ? 0.7 : 1 }}
              >
                <td style={{ fontWeight: "600" }}>{item.trackingId}</td>
                <td>
                  <div
                    style={{
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {item.senderName} <ArrowRight color="#10b981" size={16} />{" "}
                    {item.receiverName}
                  </div>
                  <small style={{ color: "#64748b" }}>{item.address}</small>
                </td>
                {/* Price Column: Agar cancel hai to strike-through dikhao */}
                <td
                  style={{
                    fontWeight: "600",
                    color: item.status === "Cancelled" ? "#94a3b8" : "#1e293b",
                  }}
                >
                  {item.status === "Cancelled" ? (
                    <strike>₹{item.cost}</strike>
                  ) : (
                    `₹${item.cost}`
                  )}
                </td>
                <td>
                  <span
                    className={`badge status-${item.status.toLowerCase().replace(/\s/g, "").replace("-", "")}`}
                  >
                    {item.status === "Cancelled" && <XCircle size={14} />}
                    {item.status}
                  </span>
                </td>
                <td>
                  <select
                    className="status-select"
                    onChange={async (e) => {
                      try {
                        await axios.put(
                          `https://satyam-swifttrack.onrender.com/api/update/${item.trackingId}`,
                          { status: e.target.value },
                        );
                        setModal({
                          open: true,
                          type: "success",
                          msg: `Status updated...!`,
                        });
                        fetchData();
                      } catch (err) {
                        setModal({
                          open: true,
                          type: "error",
                          msg: "Update failed!",
                        });
                      }
                    }}
                    value={item.status}
                    disabled={item.status === "Cancelled"}
                    style={{
                      cursor:
                        item.status === "Cancelled" ? "not-allowed" : "pointer",
                      backgroundColor:
                        item.status === "Cancelled" ? "#f1f5f9" : "white",
                    }}
                  >
                    <option value="Booked">Booked</option>
                    <option value="In-Transit">In-Transit</option>
                    <option value="Out-for-Delivery">Out-for-Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AdminDashboard;
