import { createSlice } from "@reduxjs/toolkit";

const latLngSlice = createSlice({
  name: "latLng",
  initialState: {
    coordinates: [],
    address:[]
  },
  reducers: {
    addLatLng: (state, action) => {
      state.coordinates.push(action.payload);
    },
    removeLatLng: (state, action) => {
      state.coordinates = state.coordinates.filter(
        (coord) => coord !== action.payload
      );
    },
    clearLatLng: (state) => {
      state.coordinates = [];
    },
    addAddress: (state, action) => {
      state.address.push(action.payload);
    },
    clearAddress: (state) => {
      state.address = [];
    },
  },
});

export const { addLatLng, removeLatLng, clearLatLng,addAddress,clearAddress } = latLngSlice.actions;
export default latLngSlice.reducer;
