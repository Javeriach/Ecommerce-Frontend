import { createSlice } from '@reduxjs/toolkit';

const userOrders = createSlice({
  name: 'orders',
  initialState: {
    currentOrderDetails: {},
  },
  reducers: {
    currentOrderDetailsSetter: (state, action) => {
      console.log(action.payload);
      return { ...state, currentOrderDetails: action.payload };
    },
  },
});

export const { currentOrderDetailsSetter } = userOrders.actions;
export default userOrders.reducer;
