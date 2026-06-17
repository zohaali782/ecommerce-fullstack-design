const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        product: { type: String },
        name: { type: String },
        image: { type: String },
        quantity: Number,
        price: Number,
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "pending" },
    address: { type: String },
    shipping: { type: Object },
    paymentMethod: { type: String, default: "card" },
    subtotal: { type: Number },
    tax: { type: Number },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
