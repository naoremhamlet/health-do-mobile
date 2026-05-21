import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: [
            {
                id: 1, 
                items: [
                    {
                        id: 1,
                        quantity: 3,
                        
                    },
                    {
                        id: 2,
                        quantity: 1,
                    }
                ],
                status: "delivered"
            },
            {
                id: 2, 
                items: [
                    {
                        id: 1,
                        quantity: 1,
                    },
                    {
                        id: 2,
                        quantity: 1,
                    }
                ],
                status: "delivered"
            },
            {
                id: 3, 
                items: [
                    {
                        id: 1,
                        quantity: 2,    
                    }
                ],
                status: "packaging"
            },
        ]
    },
    reducers: {
        updateOrder: (state, action) => {
            state.order = action.payload
        }
    }
})

export const { updateOrder } = orderSlice.actions

export default orderSlice.reducer