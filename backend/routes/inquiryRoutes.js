const express = require("express");
const router = express.Router();
const {
  sendInquiry,
  sendGeneralInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/inquiryController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/general", sendGeneralInquiry);
router.post("/", sendInquiry);

router.get("/", protect, isAdmin, getInquiries);
router.patch("/:id", protect, isAdmin, updateInquiryStatus);
router.delete("/:id", protect, isAdmin, deleteInquiry);

module.exports = router;
