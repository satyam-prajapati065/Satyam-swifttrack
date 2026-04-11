const mongoose = require("mongoose");
const courierSchema = new mongoose.Schema(
  {
    trackingId: { type: String, unique: true },
    userEmail: { type: String, required: true }, // <--- YE LINE HONI CHAHIYE
    senderName: { type: String, required: true },
    receiverName: { type: String, required: true },
    address: { type: String, required: true },
    weight: { type: Number, required: true },
    cost: { type: Number },
    status: { type: String, default: "Booked" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Courier", courierSchema);
