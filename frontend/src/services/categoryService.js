import { api, requestConfig } from "../utils/config";

// Get Categories
const getCategories = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/categories/`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (id, token) => {
  const config = requestConfig("DELETE", id, token);

  try {
    const res = await fetch(`${api}/categories/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getCategoryById = async (id, token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(`${api}/categories/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (id, data, token) => {
  const config = requestConfig("PUT", data, token);
  try {
    const res = await fetch(`${api}/categories/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const addCategory = async (data, token) => {
  const config = requestConfig("POST", data, token);
  try {
    const res = await fetch(`${api}/categories/create`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const categoryService = {
  getCategories,
  deleteCategory,
  getCategoryById,
  addCategory,
  updateCategory,
};

export default categoryService;
