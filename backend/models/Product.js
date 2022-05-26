const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    sales: Array,
    image: String,
    qtyStock: Number,
    categoryId: mongoose.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
