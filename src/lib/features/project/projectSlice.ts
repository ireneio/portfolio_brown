import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showProjectImageModal: false,
  modalImageList: [],
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setShowProjectImageModal: (state, action) => {
      state.showProjectImageModal = action.payload;
    },
    setModalImageList: (state, action) => {
      state.modalImageList = action.payload;
    },
  },
});

export const { setShowProjectImageModal, setModalImageList } = projectSlice.actions;

export default projectSlice.reducer;