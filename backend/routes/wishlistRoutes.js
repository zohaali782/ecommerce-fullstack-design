const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Wishlist = require("../models/Wishlist");

router.get("/", auth, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id });
  res.json(wishlist?.items || []);
});

router.post("/", auth, async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user.id });
  if (!wishlist) wishlist = new Wishlist({ user: req.user.id, items: [] });

  const exists = wishlist.items.find((i) => i.productId === req.body.productId);
  if (exists) return res.status(400).json({ message: "Already in wishlist" });

  wishlist.items.push(req.body);
  await wishlist.save();
  res.json(wishlist.items);
});

router.delete("/:productId", auth, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id });
  wishlist.items = wishlist.items.filter(
    (i) => i.productId !== req.params.productId,
  );
  await wishlist.save();
  res.json(wishlist.items);
});

module.exports = router;
