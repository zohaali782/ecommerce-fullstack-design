const Inquiry = require("../models/Inquiry");

exports.sendInquiry = async (req, res) => {
  try {
    const { projectId, projectTitle, name, company, quantity, details } =
      req.body;
    if (!name || !quantity || !projectId)
      return res
        .status(400)
        .json({ message: "Name, quantity and project required" });

    const inquiry = await Inquiry.create({
      projectId,
      projectTitle,
      name,
      company,
      quantity,
      details,
    });
    res.status(201).json({ message: "Inquiry sent!", inquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/inquiries (admin only)
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/inquiries/:id (admin only) — update status e.g. pending/contacted/closed
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.sendGeneralInquiry = async (req, res) => {
  try {
    const { item, details, quantity } = req.body;
    if (!item || !quantity)
      return res.status(400).json({ message: "Item and quantity required" });

    const inquiry = await Inquiry.create({
      projectTitle: item,
      name: "General Inquiry",
      quantity,
      details,
    });
    res.status(201).json({ success: true, message: "Inquiry sent!", inquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// DELETE /api/inquiries/:id (admin only)
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json({ message: "Inquiry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
