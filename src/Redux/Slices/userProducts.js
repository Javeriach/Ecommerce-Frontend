import { createSlice } from '@reduxjs/toolkit';

const userProducts = createSlice({
  name: 'userProducts',
  initialState: {
    userProfileProductsloading: false,
    cartedItems: {
      products: [],
      error: '',
    },
    wishedItems: {
      products: [],
      error: '',
    },
  },
  reducers: {
    fetchedCartedItemsHandler: (state, action) => {
      return {
        ...state,
        cartedItems: {
          products: action.payload,
          error: '',
        },
      };
    },
    fetchedWishedItemsHandler: (state, action) => {
      return {
        ...state,
        wishedItems: {
          products: action.payload,
          error: '',
        },
      };
    },
    cartedItemsErrorHandler: (state, action) => {
      return {
        ...state,
        cartedItems: {
          ...state.cartedItems,
          error: action.payload,
        },
      };
    },
    wishedItemsErrorHandler: (state, action) => {
      return {
        ...state,
        wishedItems: {
          ...state.cartedItems,
          error: action.payload,
        },
      };
    },

    addItemToWistlistHandler: (state, action) => {
      console.log(action.payload);

      return {
        ...state,
        wishedItems: {
          ...state.wishedItems,
          products: action.payload,
        },
      };
    },

    removeItemFromWishtlistHandler: (state, action) => {
      let filteredCartedProducts = state.wishedItems.products.filter((item) => {
        return item.product._id != action.payload;
      });
      return {
        ...state,
        wishedItems: {
          ...state.wishedItems,
          products: filteredCartedProducts,
        },
      };
    },

    addItemToCartHandler: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        cartedItems: {
          ...state.cartedItems,
          products: action.payload,
        },
      };
    },

    removeItemFromCartHandler: (state, action) => {
      let filteredCartedProducts = state.cartedItems.products.filter((item) => {
        return item.product._id != action.payload;
      });
      return {
        ...state,
        cartedItems: {
          ...state.cartedItems,
          products: filteredCartedProducts,
        },
      };
    },
    userProductsloadingHandler: (state, action) => {
      return { ...state, userProfileProductsloading: action.payload };
    },

    product_Selected_For_Purchase_Handler: (state, action) => {
      let updatedProducts = state.cartedItems.products.map((item) => {
        if (item.product._id === action.payload)
          return { ...item, selectedForPurchase: !item.selectedForPurchase };
        else return item;
      });
      return {
        ...state,
        cartedItems: {
          ...state.cartedItems,
          products: updatedProducts,
        },
      };
    },
    product_Quantity_Updation_Handler: (state, action) => {
      console.log(action.payload);
      let updatedProducts = state.cartedItems.products.map((item) => {
        if (item.product._id === action.payload.productId)
          return { ...item, quantity: action.payload.itemQuantity };
        else return item;
      });
      return {
        ...state,
        cartedItems: {
          ...state.cartedItems,
          products: updatedProducts,
        },
      };
    },
  },
});

export const {
  // =======Fetch
  fetchedCartedItemsHandler,
  fetchedWishedItemsHandler,

  // =======Errors
  cartedItemsErrorHandler,
  wishedItemsErrorHandler,

  // =======Add item
  addItemToWistlistHandler,
  addItemToCartHandler,

  // =======Remove
  removeItemFromWishtlistHandler,
  removeItemFromCartHandler,

  userProductsloadingHandler,
  product_Selected_For_Purchase_Handler,
  product_Quantity_Updation_Handler,
} = userProducts.actions;
export default userProducts.reducer;
