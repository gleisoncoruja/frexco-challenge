const express = require("express");
const router = express.Router();

// Controller
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategoryById,
  editCategory,
} = require("../controllers/CategoryController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  categoryCreateValidation,
  categoryEditValidation,
} = require("../middlewares/categoryValidation");
const authGuard = require("../middlewares/authGuard");

// Post Routes
router.post(
  "/create",
  authGuard,
  categoryCreateValidation(),
  validate,
  createCategory
);

// Get Routes
router.get("/", authGuard, getAllCategories);
router.get("/:id", authGuard, getCategoryById);

// Delete Routes
router.delete("/:id", authGuard, deleteCategory);

// Put Routes
router.put("/:id", authGuard, categoryEditValidation(), validate, editCategory);

module.exports = router;
