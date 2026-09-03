import { createSlice } from '@reduxjs/toolkit'

const historySlice = createSlice({
    name: 'history',
    initialState: {
        history: [
            { id: 'h1', productId: 1, type: 'view', timestamp: Date.now() - 1000 * 60 * 60 * 2 },
            { id: 'h2', productId: 2, type: 'search', timestamp: Date.now() - 1000 * 60 * 60 * 26 },
            { id: 'h3', productId: 3, type: 'view', timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3 },
        ]
    },
    reducers: {
        updateHistory: (state, action) => {
            state.history = action.payload
        }
    }
})

export const { updateHistory } = historySlice.actions

export default historySlice.reducer