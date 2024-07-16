import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showProjectImageModal: false,
  modalImageList: [],
  initalModalImageIndex: -1,
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
    setInitalModalImageIndex: (state, action) => {
      state.initalModalImageIndex = action.payload;
    },
  },
});

export const {
  setShowProjectImageModal,
  setModalImageList,
  setInitalModalImageIndex,
} = projectSlice.actions;

export default projectSlice.reducer;