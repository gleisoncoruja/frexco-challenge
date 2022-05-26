const Product = require("../models/Product");
const mongoose = require("mongoose");

// Create a product

const createProduct = async (req, res) => {
  const { name, description, price, categoryId, qtyStock } = req.body;

  // Check if already exists
  const product = await Product.findOne({ name });

  if (product) {
    res.status(422).json({ error: ["Já existe um prodduto com essse nome."] });
    return;
  }

  let image = null;

  if (req.file) {
    image = req.file.filename;
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    image,
    categoryId,
    qtyStock: qtyStock,
  });

  if (!newProduct) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }

  res.status(201).json(newProduct);
};

// Get all products

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(products);
};

// Delete product by Id
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Try find product by idd
    const product = await Product.findById(id);

    // if don't exists return error
    if (!product) {
      res.status(404).json({ errors: ["Produto não encontrado"] });
      return;
    }

    // If exists, delte
    await Product.findByIdAndDelete(mongoose.Types.ObjectId(product._id));

    res.status(200).json({
      _id: product._id,
      name: product.name,
      message: "Produdo excluído com sucesso!",
    });
  } catch (error) {
    res.status(404).json({ errors: ["Produto não encontrado"] });
    return;
  }
};

// Get product by id
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    // Try find product by idd
    const product = await Product.findById(id);

    // if don't exists return error
    if (!product) {
      res.status(404).json({ errors: ["Produto não encontrado"] });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ errors: ["Produto não encontrado"] });
    return;
  }
};

// Edit product
const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId, qtyStock } = req.body;
  let image = null;

  if (req.file) {
    image = req.file.filename;
  }

  try {
    // Check if product exists
    const product = await Product.findById(id);

    // if dont exists return error
    if (!product) {
      res.status(404).json({ erros: ["Produto não encontrado"] });
      return;
    }

    // check if user change name
    if (name) {
      // check if already exists product with the same name
      const existsProduct = await Product.findOne({ name });
      if (existsProduct && product.name != existsProduct.name) {
        res
          .status(422)
          .json({ errors: ["Já existe um produto com esse nome"] });
        return;
      }

      // update the name
      product.name = name;
    }

    // check for description change
    if (description) {
      product.description = description;
    }

    //check for price change
    if (price) {
      product.price = price;
    }

    // Check for category change
    if (categoryId) {
      product.categoryId = categoryId;
    }

    // check for qty stock change
    if (qtyStock) {
      product.qtyStock = qtyStock;
    }

    // Check for image change
    if (image) {
      product.image = image;
    }

    // Save
    await product.save();

    res
      .status(200)
      .json({ product, message: ["Produto atualizado com sucesso!"] });
  } catch (error) {
    res
      .status(422)
      .json({ erros: ["Houve um erro, por favor tente mais tarde"] });
    return;
  }
};

// Get product by category id
const getProductByCategoryId = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.find({ categoryId: id })
      .sort([["createdAt", -1]])
      .exec();

    res.status(200).json(products);
  } catch (error) {
    res
      .status(422)
      .json({ errors: ["Houve um erro por favor tente mais tarde"] });
    return;
  }
};

// Make a sale
const saleProduct = async (req, res) => {
  const { productId, qty } = req.body;

  const user = req.user;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404).json({ errors: ["Produto não encontrado"] });
    return;
  }

  if (parseFloat(qty) <= 0) {
    res.status(422).json({
      errors: ["Quantidade inválida"],
    });
    return;
  }

  if (parseFloat(qty) > parseFloat(product.qtyStock)) {
    res.status(422).json({
      errors: ["A quantidade excede o limite disponível em estoque."],
    });
    return;
  }

  const salesDetail = {
    date: new Date(Date.now()),
    userId: user._id,
    userName: user.name,
    productId: product._id,
    productName: product.name,
    qty,
  };

  product.qtyStock = product.qtyStock - qty;

  product.sales.push(salesDetail);

  await product.save();

  res
    .status(200)
    .json({ salesDetail, message: "Compra realizada com sucesso!" });
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  editProduct,
  getProductByCategoryId,
  saleProduct,
};
