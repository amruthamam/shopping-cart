import { describe, expect, it } from 'vitest'
import userReducer, { saveUserDetails, clearUserDetails } from './userSlice'

describe('userSlice', () => {
  it('updates the user details', () => {
    const state = userReducer(undefined, saveUserDetails({
      fullName: 'Ava Sharma',
      phoneNumber: '9876543210',
      address: '12 MG Road',
      city: 'Bangalore',
      pincode: '560001'
    }))

    expect(state.fullName).toBe('Ava Sharma')
    expect(state.phoneNumber).toBe('9876543210')
    expect(state.address).toBe('12 MG Road')
  })

  it('clears the user details', () => {
    const state = userReducer({
      fullName: 'Ava Sharma',
      phoneNumber: '9876543210',
      address: '12 MG Road',
      city: 'Bangalore',
      pincode: '560001'
    }, clearUserDetails())

    expect(state.fullName).toBe('')
    expect(state.phoneNumber).toBe('')
    expect(state.address).toBe('')
  })
})
