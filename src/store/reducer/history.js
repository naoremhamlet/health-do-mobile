import { createSlice } from '@reduxjs/toolkit'

const historySlice = createSlice({
    name: 'cart',
    initialState: {
        history: []
    },
    reducers: {
        updateHistory: (state, action) => {
            state.history = action.payload
        }
    }
})

export const { updateHistory } = historySlice.actions

export default historySlice.reducer