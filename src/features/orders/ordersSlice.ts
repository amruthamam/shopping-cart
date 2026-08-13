import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
};

export type Order = {
  id: string;
  placedAt: string;
  total: number;
  customer: {
    fullName: string;
    phoneNumber: string;
    address: string;
    city: string;
    pincode: string;
  };
  items: OrderItem[];
};

const initialState: Order[] = [];

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.unshift(action.payload);
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      return action.payload;
    }
  }
});

export const { addOrder, setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
