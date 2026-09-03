import { createSlice } from '@reduxjs/toolkit'

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addresses: [
            { id: '1', type: 'Home', address: 'Nambol Naorem, Near Community Hall, Bishnupur, Manipur - 795134', phone: '+91 9366309563' },
            { id: '2', type: 'Work', address: 'IIIT Campus, Electronic City Phase 1, Bangalore, Karnataka - 560100', phone: '+91 9366309563' },
        ],
        selectedAddressId: '1',
    },
    reducers: {
        updateAddresses: (state, action) => {
            state.addresses = action.payload
        },
        setSelectedAddress: (state, action) => {
            state.selectedAddressId = action.payload
        }
    }
})

export const { updateAddresses, setSelectedAddress } = addressSlice.actions

export default addressSlice.reducer
