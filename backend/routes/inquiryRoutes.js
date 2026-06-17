const express = require("express");
const router = express.Router();
const {
  sendInquiry,
  getInquiries,
} = require("../controllers/inquiryController");

router.post("/", sendInquiry);
router.get("/", getInquiries);

module.exports = router;
