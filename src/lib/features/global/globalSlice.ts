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
    },
  },
});

export const { setSidebarOpen } = globalSlice.actions;

export default globalSlice.reducer;