import { createSlice } from '@reduxjs/toolkit'

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: {
        favourites: []
    },
    reducers: {
        updateFavourites: (state, action) => {
            state.favourites = action.payload
        }
    }
})

export const { updateFavourites } = favouritesSlice.actions

export default favouritesSlice.reducer