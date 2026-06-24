const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post("/", protect, isAdmin, createProject);
router.put("/:id", protect, isAdmin, updateProject);
router.delete("/:id", protect, isAdmin, deleteProject);

module.exports = router;
