const express = require("express");
const router = express.Router();

// Controller
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  editProduct,
  getProductByCategoryId,
  saleProduct,
} = require("../controllers/ProductController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");
const authGuard = require("../middlewares/authGuard");
const {
  productCreateValidation,
  productEditValidation,
  saleValidation,
} = require("../middlewares/productValidation");

// Post Routes
router.post(
  "/create",
  authGuard,
  imageUpload.single("image"),
  productCreateValidation(),
  validate,
  createProduct
);

// Get Routes
router.get("/", authGuard, getAllProducts);
router.get("/:id", authGuard, getProductById);
router.get("/category/:id", authGuard, getProductByCategoryId);

// Delete Routes
router.delete("/:id", authGuard, deleteProduct);

// Put Routes
router.put("/buy", authGuard, saleValidation(), validate, saleProduct);

router.put(
  "/:id",
  authGuard,
  imageUpload.single("image"),
  productEditValidation(),
  validate,
  editProduct
);

module.exports = router;
