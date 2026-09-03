import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        orderUpdates: true,
        promotions: false,
        locationAccess: true,
    },
    reducers: {
        updateSettings: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export const { updateSettings } = settingsSlice.actions

export default settingsSlice.reducer
