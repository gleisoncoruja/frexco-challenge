import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../services/categoryService";

const initialState = {
  categories: {},
  category: {},
  error: null,
  success: false,
  loading: false,
  message: null,
};

export const getCategories = createAsyncThunk(
  "categories/listcategories",
  async (categories, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await categoryService.getCategories(token);
    return data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deletecategory",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await categoryService.deleteCategory(id, token);
    return data;
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getcategorybyid",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await categoryService.getCategoryById(id, token);
    return data;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updatecategory",
  async (newData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await categoryService.updateCategory(
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

export const addCategory = createAsyncThunk(
  "categories/addcategory",
  async (category, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await categoryService.addCategory(category, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Categoria excluída com sucesso!";
      })
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.category = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Categoria atualizada com sucesso!";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Categoria criada com sucesso!";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
