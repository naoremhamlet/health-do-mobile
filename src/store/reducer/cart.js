import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartLen: 0
    },
    reducers: {
        updateCart: (state, action) => {
            state.cart = action.payload,
            state.cartLen = action.payload.length
        }
    }
})

export const { updateCart } = cartSlice.actions

export default cartSlice.reducer