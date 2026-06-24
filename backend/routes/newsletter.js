const express = require("express");
const Newsletter = require("../models/Newsletter");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/newsletter/subscribe (public)
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  try {
    await Newsletter.create({ email });
    res.json({ success: true, message: "Subscribed successfully!" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ success: false, message: "Already subscribed!" });
    } else {
      res.status(500).json({ success: false, message: "Server error!" });
    }
  }
});

// GET /api/newsletter (admin only) — list all subscribers
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/newsletter/:id (admin only)
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const sub = await Newsletter.findByIdAndDelete(req.params.id);
    if (!sub) return res.status(404).json({ message: "Subscriber not found" });
    res.json({ message: "Subscriber removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
