const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Address = require("../models/Address");

router.get("/", auth, async (req, res) => {
  const doc = await Address.findOne({ user: req.user.id });
  res.json(doc?.addresses || []);
});

router.post("/", auth, async (req, res) => {
  let doc = await Address.findOne({ user: req.user.id });
  if (!doc) doc = new Address({ user: req.user.id, addresses: [] });

  if (req.body.isDefault) {
    doc.addresses.forEach((a) => (a.isDefault = false));
  }

  doc.addresses.push(req.body);
  await doc.save();
  res.json(doc.addresses);
});

router.put("/:id", auth, async (req, res) => {
  const doc = await Address.findOne({ user: req.user.id });
  const addr = doc.addresses.id(req.params.id);
  if (!addr) return res.status(404).json({ message: "Not found" });

  if (req.body.isDefault) {
    doc.addresses.forEach((a) => (a.isDefault = false));
  }

  Object.assign(addr, req.body);
  await doc.save();
  res.json(doc.addresses);
});

router.delete("/:id", auth, async (req, res) => {
  const doc = await Address.findOne({ user: req.user.id });
  doc.addresses = doc.addresses.filter(
    (a) => a._id.toString() !== req.params.id,
  );
  await doc.save();
  res.json(doc.addresses);
});

module.exports = router;
