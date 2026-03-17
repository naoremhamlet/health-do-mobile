import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        cart: [
            {id: 1, quantity: 3, status: "delivered"},
            {id: 2, quantity: 1, status: "cancelled"},
            {id: 3, quantity: 1, status: "transit"},
            {id: 4, quantity: 1, status: "packaging"}
        ]
    },
    reducers: {
        updateOrder: (state, action) => {
            state.cart = action.payload
        }
    }
})

export const { updateOrder } = orderSlice.actions

export default orderSlice.reducer