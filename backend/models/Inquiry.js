const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    projectId: { type: String },
    projectTitle: { type: String },
    name: { type: String, required: true },
    company: { type: String },
    quantity: { type: Number, required: true },
    details: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Inquiry", inquirySchema);
