import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

type CartItem = Product & { qty: number };

type CartState = {
  items: Record<string, number>;
};

const initialState: CartState = {
  items: {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      state.items[action.payload] = (state.items[action.payload] || 0) + 1;
    },
    updateCartQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        delete state.items[id];
        return;
      }
      state.items[id] = qty;
    },
    clearCart: (state) => {
      state.items = {};
    }
  }
});

export const { addToCart, updateCartQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
