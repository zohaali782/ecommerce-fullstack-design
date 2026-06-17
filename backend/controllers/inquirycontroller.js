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

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
