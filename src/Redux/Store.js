import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import handlersReducer from './Slices/handlersSlice';
import eshopReducer from './Slices/eshopSlice';
import userProductReducer from './Slices/userProducts';
import userOrderReducer from './Slices/orders';

const store = configureStore({
  reducer: {
    user: userReducer,
    handlers: handlersReducer,
    eshopData: eshopReducer,
    userProducts: userProductReducer,
    userorders: userOrderReducer,
  },
});

export default store;
