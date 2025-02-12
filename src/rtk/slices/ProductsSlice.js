import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const sliceName = "productsSlice";

export const fetchProducts = createAsyncThunk(
  `${sliceName}/fetchProducts`,
  async () => {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data.products;
  }
);

const productsSlice = createSlice({
  name: sliceName,
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const productsReducer = productsSlice.reducer;
