const Category = require("../models/Category");
const mongoose = require("mongoose");

// Create category
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  const category = await Category.findOne({ name });

  // Check if category already exists
  if (category) {
    res
      .status(422)
      .json({ errors: ["Já existe uma categoria com essse nome."] });
    return;
  }

  // Create new category
  const newCategory = await Category.create({
    name,
    description,
  });

  // Check if created successfully
  if (!newCategory) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }

  res.status(201).json(newCategory);
};

// Get all categories

const getAllCategories = async (req, res) => {
  const categories = await Category.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(categories);
};

// Delete a category by id

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(mongoose.Types.ObjectId(id));

    // Check if category exists
    if (!category) {
      res.status(404).json({ errors: ["Categoria não encontrada"] });
      return;
    }

    // Delete
    await Category.findByIdAndDelete(category._id);

    res.status(200).json({
      id: category._id,
      name: category.name,
      message: "Categoria excluída com sucesso!",
    });
  } catch (error) {
    res.status(404).json({ errors: ["Categoria não encontrada"] });
    return;
  }
};

// Get category by id
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(mongoose.Types.ObjectId(id));

    // Check if category exists
    if (!category) {
      res.status(404).json({ errors: ["Categoria não encontrada"] });
      return;
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ errors: ["Categoria não encontrada"] });
    return;
  }
};

// Edit Category
const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findById(mongoose.Types.ObjectId(id));

    // Check if category exists
    if (!category) {
      res.status(404).json({ errors: ["Categoria não encontrada"] });
      return;
    }

    // Check for a name change
    if (name) {
      // Checks if a category with that name already exists
      const existsCategory = await Category.findOne({ name });
      if (existsCategory && category.name != existsCategory.name) {
        res
          .status(422)
          .json({ errors: ["Já existe uma categoria com esse nome"] });
        return;
      }

      category.name = name;
    }

    // Check for a description change
    if (description) {
      category.description = description;
    }

    // Save the change
    await category.save();

    res
      .status(200)
      .json({ category, message: "Categoria  atualizada com sucesso!" });
  } catch (error) {
    res.status(404).json({ errors: ["Categoria não encontrada"] });
    return;
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategoryById,
  editCategory,
};
