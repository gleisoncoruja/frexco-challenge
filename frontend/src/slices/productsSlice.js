import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "../services/productsService";

const initialState = {
  products: {},
  product: {},
  error: null,
  success: false,
  loading: false,
  message: null,
};

export const getProducts = createAsyncThunk(
  "products/listproducts",
  async (products, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productsService.getProducts(token);
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteproduct",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productsService.deleteProduct(id, token);
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addproduct",
  async (product, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productsService.addProduct(product, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getProductById = createAsyncThunk(
  "products/getproductbyid",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productsService.getProductById(id, token);
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateproduct",
  async (newData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productsService.updateProduct(
      newData.id,
      newData.data,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const buyProduct = createAsyncThunk(
  "products/buyproduct",
  async (cart, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await productsService.buyProduct(cart, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Produto excluído com sucesso!";
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Produto criado com sucesso!";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Produto atualizado com sucesso!";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(buyProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Produto comprado com sucesso!";
      })
      .addCase(buyProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      });
  },
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;
