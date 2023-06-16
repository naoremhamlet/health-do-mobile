import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [{id: 1, quantity: 3}, {id: 2, quantity: 1}]
    },
    reducers: {
        updateCart: (state, action) => {
            state.cart = action.payload
        }
    }
})

export const { updateCart } = cartSlice.actions

export default cartSlice.reducer