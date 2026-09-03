import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        sortBy: 'Newest',
        activeFilters: [],
    },
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setActiveFilters: (state, action) => {
            state.activeFilters = action.payload
        }
    }
})

export const { setSortBy, setActiveFilters } = productsSlice.actions

export default productsSlice.reducer
