import { createSlice } from '@reduxjs/toolkit'

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [
            {
                id: 1,
                status: 'preparing',
                date: 'Today, 7:45 PM',
                items: [
                    { id: 1, quantity: 2 },
                    { id: 9, quantity: 2 },
                ]
            },
            {
                id: 2,
                status: 'delivered',
                date: 'Aug 15, 2026',
                items: [
                    { id: 4, quantity: 1 },
                ]
            },
        ]
    },
    reducers: {
        updateOrders: (state, action) => {
            state.orders = action.payload
        }
    }
})

export const { updateOrders } = ordersSlice.actions

export default ordersSlice.reducer
