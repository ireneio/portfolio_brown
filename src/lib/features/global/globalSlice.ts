import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: '',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
      if (action.payload === true) {
        document.body.style.overflowY = 'hidden'
      } else if (action.payload === false) {
        document.body.style.overflowY = 'auto'
      }
    },
  },
});

export const { setSidebarOpen } = globalSlice.actions;

export default globalSlice.reducer;