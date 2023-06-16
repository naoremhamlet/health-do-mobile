import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
    name: 'cart',
    initialState: {
        id: null,
        detail: {
            name: "",
            phone: "",
            email: "",
            address: ""
        }
    },
    reducers: {
        updateAccount: (state, action) => {
            state.id = action.payload.id,
            state.detail = action.payload.detail
        }
    }
})

export const { updateAccount } = accountSlice.actions

export default accountSlice.reducer