import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDetails } from './userSlice'

export type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
  unit: string
}

export type Order = {
  id: string
  placedAt: string
  total: number
  customer: UserDetails
  items: OrderItem[]
}

const initialState: Order[] = []

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.unshift(action.payload)
    },
    clearOrders: () => {
      return initialState
    }
  }
})

export const { addOrder, clearOrders } = orderSlice.actions
export default orderSlice.reducer
