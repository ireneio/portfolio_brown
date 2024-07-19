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
      function disableOnScroll(event: Event) {
        event.preventDefault();
      }
      if (action.payload === true) {
        document.body.style.overflowY = 'hidden'
        window.addEventListener('scroll', disableOnScroll, { passive: false });
      } else if (action.payload === false) {
        document.body.style.overflowY = 'auto'
        window.removeEventListener('scroll', disableOnScroll)
      }
    },
  },
});

export const { setSidebarOpen } = globalSlice.actions;

export default globalSlice.reducer;