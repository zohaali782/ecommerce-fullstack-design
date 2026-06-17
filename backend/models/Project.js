const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    minOrder: { type: Number, required: true },
    unit: { type: String, required: true },
    priceRange: { type: String, required: true },
    deadline: { type: String, required: true },
    fulfilled: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Starting", "In progress", "Near complete", "Completed"],
      default: "Starting",
    },
    statusColor: { type: String, default: "bg-gray-100 text-gray-600" },
    tags: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
