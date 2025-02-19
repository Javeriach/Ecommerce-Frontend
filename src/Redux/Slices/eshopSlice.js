import { createSlice } from '@reduxjs/toolkit';

const eshopData = createSlice({
  name: 'eshopData',
  initialState: {
    products: [],
    categories: [],
    productToUpdate: {},
    loading: false,
    searchedProductsList: [],
  },
  reducers: {
    categoryAdditionHandler: (state, action) => {
      return { ...state, categories: [action.payload, ...state.categories] };
    },
    productAdditionHandler: (state, action) => {
      return { ...state, products: [action.payload, ...state.products] };
    },
    product_To_UpdateHandler: (state, action) => {
      console.log(action.payload);
      return { ...state, productToUpdate: action.payload };
    },
    categoriesHandler: (state, action) => {
      return { ...state, categories: action.payload };
    },
    productsHandler: (state, action) => {
      return { ...state, products: action.payload };
    },
    loadingHandler: (state, action) => {
      return { ...state, loading: action.payload };
    },
    removeProductHandler: (state, action) => {
      let filteredProducts = state.products.filter((product) => {
        return product._id != action.payload;
      });
      return { ...state, products: filteredProducts };
    },
    productsUpdationHandler: (state, action) => {
      console.log('Payload:', action.payload); // Log the payload for debugging

      // Update the product in the products array
      const updatedProductsList = state.products.map((product) =>
        product._id === action.payload._id
          ? { ...product, ...action.payload }
          : product
      );

      console.log('Updated Products List:', updatedProductsList); // Log the updated list for debugging
      return { ...state, products: updatedProductsList, productToUpdate: {} };
    },
    searchedProductsListHandler: (state, action) => {
      return { ...state, searchedProductsList: action.payload };
    },
  },
});

export const {
  categoryAdditionHandler,
  productAdditionHandler,
  product_To_UpdateHandler,
  categoriesHandler,
  productsHandler,
  loadingHandler,
  removeProductHandler,
  productsUpdationHandler,
  searchedProductsListHandler,
} = eshopData.actions;
export default eshopData.reducer;
