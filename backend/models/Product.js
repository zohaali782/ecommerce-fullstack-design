const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    subcategory: { type: String },
    image: { type: String },
    images: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    isHot: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    brand: { type: String },
    shipping: { type: String, default: "Worldwide shipping" },
    condition: { type: String, default: "Brand new" },
    type: { type: String },
    material: { type: String },
    design: { type: String },
    customization: { type: String },
    protection: { type: String },
    warranty: { type: String },
    description: { type: String },
    specs: { type: Object },
    features: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
