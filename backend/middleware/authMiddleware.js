const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ORIGINAL middleware — kept exactly as before so existing imports
// (e.g. in orderRoutes, projectRoutes) keep working unchanged.
// Puts the raw decoded token payload ({ id }) on req.user.
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", expired: true });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

// NEW — for admin panel routes only.
// Verifies the token AND loads the full user from DB (so we get role, name, etc).
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", expired: true });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

// NEW — must be used after `protect`. Checks role === "admin".
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

// Default export stays the same as before (backward compatible).
module.exports = authMiddleware;

// Named exports added on top, for the new admin routes.
module.exports.protect = protect;
module.exports.isAdmin = isAdmin;
