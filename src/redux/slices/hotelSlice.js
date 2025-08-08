import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hotelSearch: [],
  errors:null
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setHotelSearch(state, action) {
      state.hotelSearch = action.payload;
    },
    setErrors(state,action){
      state.errors=action.payload
    },
      resetHotelSearch(state) {
      state.hotelSearch = [];
    },
  },
});

export const { setLoading, setHotelSearch,setErrors,  resetHotelSearch } = hotelSlice.actions;
export default hotelSlice.reducer;
