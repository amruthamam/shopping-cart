import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserDetails = {
  fullName: string
  phoneNumber: string
  address: string
  city: string
  pincode: string
}

const initialState: UserDetails = {
  fullName: '',
  phoneNumber: '',
  address: '',
  city: '',
  pincode: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserDetails: (state, action: PayloadAction<UserDetails>) => {
      return { ...state, ...action.payload }
    },
    clearUserDetails: () => {
      return initialState
    }
  }
})

export const { saveUserDetails, clearUserDetails } = userSlice.actions
export default userSlice.reducer
