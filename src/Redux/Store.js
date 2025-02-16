import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import handlersReducer from './Slices/handlersSlice';
import eshopReducer from './Slices/eshopSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    handlers: handlersReducer,
    eshopData: eshopReducer,
  },
});
export default store;
