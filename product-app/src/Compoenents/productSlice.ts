import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./type";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
    },
  },
});

export const { addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;