import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        id: null,
        detail: {
            name: "",
            phone: "",
            email: "",
            address: "",
            profileImage: null,
            age: null,
            sex: null
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