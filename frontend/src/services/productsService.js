import { api, requestConfig } from "../utils/config";

const getProducts = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/products/`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id, token) => {
  const config = requestConfig("DELETE", id, token);

  try {
    const res = await fetch(`${api}/products/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (data, token) => {
  const config = requestConfig("POST", data, token, true);
  try {
    const res = await fetch(`${api}/products/create`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (id, token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(`${api}/products/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (id, data, token) => {
  const config = requestConfig("PUT", data, token, true);
  try {
    const res = await fetch(`${api}/products/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const buyProduct = async (data, token) => {
  const config = requestConfig("PUT", data, token);
  try {
    const res = await fetch(`${api}/products/buy`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const productsService = {
  getProducts,
  deleteProduct,
  addProduct,
  getProductById,
  updateProduct,
  buyProduct,
};

export default productsService;
