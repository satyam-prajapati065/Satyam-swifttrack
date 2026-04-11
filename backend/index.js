const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Courier = require("./models/Courier");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB Connected & Models Synced!"))
  .catch((err) => console.log("❌ DB Error:", err));

// 1. Signup API:
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered!" });

    // --- Yeh Logic Add Karo ---
    let role = "user";
    if (email === "satyamprajapati065@gmail.com") {
      role = "admin";
    }
    // -------------------------

    const newUser = new User({ name, email, password, role }); // role pass karo yahan
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Login API:
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Ab seedha user.role bhejo, DB se apne aap "admin" aayega
    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Tracking Logic
app.get("/api/track/:id", async (req, res) => {
  try {
    const data = await Courier.findOne({ trackingId: req.params.id });
    if (data) res.json(data);
    else res.status(404).json({ message: "Courier Not Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Admin Status Update
app.put("/api/update/:id", async (req, res) => {
  try {
    const updated = await Courier.findOneAndUpdate(
      { trackingId: req.params.id },
      { status: req.body.status },
      { new: true },
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Admin Dashboard (All Couriers)
app.get("/api/admin/all", async (req, res) => {
  try {
    const couriers = await Courier.find().sort({ createdAt: -1 });
    res.json(couriers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/book", async (req, res) => {
  try {
    const trackingId = "ST" + Math.floor(100000 + Math.random() * 900000);
    const cost = req.body.weight * 50;

    const newCourier = new Courier({
      ...req.body,
      userEmail: req.body.userEmail,
      trackingId,
      cost,
    });

    await newCourier.save();
    res.status(201).json(newCourier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Naya API:
app.get("/api/user-orders/:email", async (req, res) => {
  try {
    const orders = await Courier.find({ userEmail: req.params.email }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Order Cancel
app.put("/api/cancel-order/:id", async (req, res) => {
  try {
    const updatedOrder = await Courier.findOneAndUpdate(
      { trackingId: req.params.id },
      { status: "Cancelled" },
      { new: true },
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Cancellation failed" });
  }
});

// --- Server Port Configuration ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 SwiftTrack Server running on port ${PORT}`),
);
