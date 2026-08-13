import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

type ProductsState = {
  items: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProductsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setProducts, setProductsLoading, setProductsError } = productsSlice.actions;
export default productsSlice.reducer;
