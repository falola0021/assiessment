import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  origin: null,
  destinatin: null,
  travelTimeInformation: null,
  carLocation: null
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload
    },
    setDestination: (state, action) => {
      state.destination = action.payload
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload
    },
    setCarLocation: (state, action) => {
      state.carLocation = action.payload
    }
  }
})

export const { setDestination, setOrigin, setTravelTimeInformation, setCarLocation } =
  navSlice.actions

export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation
export const selectedCarLocation = (state) => state.nav.carLocation

export default navSlice.reducer
