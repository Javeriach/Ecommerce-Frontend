import { createSlice } from '@reduxjs/toolkit';

const handlersSlice = createSlice({
  name: 'handlers',
  initialState: {
    showOverlay: '',
  },
  reducers: {
    setShowOverlay: (state, action) => {
      console.log(action.payload);
      return { ...state, showOverlay: action.payload };
    },
  },
});

export const { setShowOverlay } = handlersSlice.actions;
export default handlersSlice.reducer;
