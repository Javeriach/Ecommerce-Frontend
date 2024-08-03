import { createContext, useContext, useEffect, useReducer } from 'react';
import { useEShopData } from './EShopDataProvider';
import { loadStripe } from '@stripe/stripe-js';

import { useState } from 'react';
// ============FireBase

import { Auth } from '../Config/Config-firebase';
import {
  getDocs,
  collection,
  deleteDoc,
  setDoc,
  updateDoc,
  doc,
  addDoc,
  query,
  where
} from 'firebase/firestore';

import { fireDatabase } from '../Config/Config-firebase';
import { useAuthenticator } from './Authenticator';
import toast from 'react-hot-toast';

// ============Shopping Store

let ShoppingContext = createContext();

// UseReducer for all states
let reducer = (state, action) => {
  switch (action.type) {
    case 'isLoading': {
      return { ...state, isLoading: action.payLoad };
    }

    case 'addToCart':
      return {
        ...state,
        addToCartList: action.payLoad,
      };

    case 'removeFromCart':
      return {
        ...state,
        addToCartList: state.addToCartList.filter(
          (element) => element.id !== action.payLoad
        ),
        cartedBuyList: state.cartedBuyList.filter(
          (element) => element.id !== action.payLoad
        ),
      };

    case 'updatedQuatity':
      return {
        ...state,
        addToCartList: state.addToCartList.map((element) =>
          element.id === action.payLoad.id ? action.payLoad : element
        ),
      };

    case 'cartedBuyList': {
      let arrayLength = state.cartedBuyList.filter(
        (element) => element.id === action.payLoad.id
      ).length;

      if (arrayLength > 0) {
        let tempArray = state.cartedBuyList.map((element) => {
          if (element.id === action.payLoad.id) {
            return action.payLoad;
          }
          return element;
        });
        return { ...state, cartedBuyList: tempArray };
      } else {
        return {
          ...state,
          cartedBuyList: [...state.cartedBuyList, action.payLoad],
        };
      }
    }

    case 'removeFromCartBuyList':
      return {
        ...state,
        cartedBuyList: state.cartedBuyList.filter(
          (element) => element.id !== action.payLoad
        ),
      };

    case 'wishList':
      return { ...state, wishlist: action.payLoad };

  
    case 'session_url': {
      return { ...state, session_url: action.payLoad };
    }
    
    case 'error':
      return { ...state, error: action.payLoad };
  
  
    default:
      return state;
  }
};

//=======================Funtion=========================
function ShoppingCart({ children }) {
  // ----UseReducer Hook Implimentation
  let initialState = {
    isLoading: false,
    addToCartList: [],
    cartedBuyList: [],
    wishlist: [],
  
    session_url: 'http://localhost:5173/success',
    error:{type:'',errorText:''}
  };

  
  let { currentUserDetails, maintainUserSession } = useAuthenticator();
  let { currentProduct } = useEShopData();

  let [state, dispatch] = useReducer(reducer, initialState);
  let {
    isLoading,
    addToCartList,
    cartedBuyList,
    wishlist,
    session_url,
   error
  } = state;

  // ---------------------functions
  let fetchData = async () => {

    if (!currentUserDetails?.uid)
    {
      dispatch({ type: 'addToCart', payLoad:[] });
      return;
    }

    try {

      dispatch({ type: 'isLoading', payLoad: true });
      let collectionRef = collection(fireDatabase, 'CartedProducts');
      let data = query(collectionRef, where('userId', '==', currentUserDetails?.uid));
      const result = await getDocs(data);
      let products = [];

       result.docs.forEach(item => {
        products.push({ ...item.data(), id: item.id });
       });
      dispatch({ type: 'addToCart', payLoad: products });

    } catch (error) {

      dispatch({type:"error",payLoad:{type:'cart',errorText:'Carted Products fetching failed'}});
     
      throw new Error("Carted Products Fetching failed");
      
    } finally {
      dispatch({ type: 'isLoading', payLoad: false });
    }
  };

  useEffect(() => {
    fetchData();
    fetchWishlist();
  }, [currentUserDetails]);

  

  // ==================================Funtions
  //--------------------- Add to cart handler function
  //In add to cart handler we store the item with the itemid + userId
  async function addToCartHandler(item, itemQuantity = 1) {

    if (!currentProduct) return;
    let filteredProducts = addToCartList?.filter(CartedProduct =>
    {
      return (CartedProduct.id === item.id +(Auth?.currentUser?.uid));
    }
    )

    if (filteredProducts.length)
    {
      toast.success(`Item Already Exist!`);
      return;
    }
    let collectionRef = doc(fireDatabase, 'CartedProducts', item.id+currentUserDetails?.id);

    
    try {
      if (!currentUserDetails?.uid) return;
      dispatch({ type: 'isLoading', payLoad: true });
      let updateditem = {
        userId: currentUserDetails?.uid,
        itemQuantity: itemQuantity,
        imageURL: item.image[0],
        price: item.price,
        name: item.name,
        itemSelectedTobuy: false,
        regularItemId:item.id
      };
      await setDoc(collectionRef, updateditem);
      toast.success(`Item added to Cart!`);

      fetchData();
    } catch (error) {
      toast.error(`Addition to cart failed!`);
      throw new Error(error.message);
    } finally {
      dispatch({ type: 'isLoading', payLoad: false });
    }
  }

  //--------------------- item quantity handler

  function quantityHandler(id, itemQuantity) {
    let item = addToCartList.filter((element) => element.id === id);
    dispatch({ type: 'updatedQuatity', payLoad: { ...item[0], itemQuantity } });
  }

  // ---------------------function to remove selected items from the cart
  async function removeFromCart(id) {
    try {
      dispatch({ type: 'isLoading', payLoad: true });
      let docRef = doc(fireDatabase, 'CartedProducts', id);
      await deleteDoc(docRef);
      toast.success(`Item removed from Cart!`);

      fetchData();
    } catch (error) {

      toast.error(`Item can't be removed from Cart!`);

      throw new Error(error.message);
    } finally {
      dispatch({ type: 'isLoading', payLoad: false });
    }
  }

  function totalAmountHandler(message, id, amount) {
    if (message === 'remove')
      dispatch({ type: 'removeFromCartBuyList', payLoad: id });
    else dispatch({ type: 'cartedBuyList', payLoad: { id, amount } });
  }

  // ---------------------function to update carted product
  async function updataCartedProduct(type, value, id) {
    try {
      dispatch({ type: 'isLoading', payLoad: true });
      let docRef = doc(fireDatabase, 'CartedProducts', id);
      if (type === 'checkbox') {
        await updateDoc(docRef, { itemSelectedTobuy: value });
        fetchData();
      }
      if (type === 'itemQuantity') {
        await updateDoc(docRef, { itemQuantity: value });
        fetchData();
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      dispatch({ type: 'isLoading', payLoad: false });
    }
  }
  // ============================Wishlist=============================

  async function fetchWishlist() {
    if (!currentUserDetails?.uid)
      {
        dispatch({ type: 'wishList', payLoad:[] });
        return;
    }
    
    let collectionRef = collection(fireDatabase, 'Wishlist');
    let data = query(collectionRef, where('userId', '==', currentUserDetails?.uid));
    const result = await getDocs(data);
    let products = [];

     result.docs.forEach(item => {
      products.push({ ...item.data(), id: item.id });
     });
  
    dispatch({ type: 'wishList', payLoad: products });
  }
  //add to wishlist

  async function addTOWishlist(id, name, price, image) {

    if (!currentProduct) return;
    let filteredProducts = wishlist?.filter(wishedProduct =>
    {
      return (wishedProduct.id === id +(Auth?.currentUser?.uid));
    }
    )

    if (filteredProducts.length)
    {
      toast.success(`Item Already Exist in the Wishlist!`);
      return;
    }
    let docRef = doc(fireDatabase, 'Wishlist', id+currentUserDetails?.id);


    try {
      dispatch({ type: 'isLoading', payLoad: true });
      await setDoc(docRef, { name: name, price: price, image: image, userId: currentUserDetails?.uid,regularItemId:id });
      toast.success(`Item added to wishlist!`);

      fetchWishlist();
    } catch (error) {
      toast.error(`Addition to Wishlist failed!`);
      throw new Error(error.message);
    } finally {
      dispatch({ type: 'isLoading', payLoad: false });
    }
  }
  //remove from wishlist

  async function deleteWishItem(id) {
    dispatch({ type: 'isLoading', payLoad: true });
    try {
      let docRef = doc(fireDatabase, 'Wishlist', id);
      await deleteDoc(docRef);
      toast.success(`Item removed from wishlist!`);
      fetchWishlist();
    } catch (error) {

      toast.error(`Item can't be removed from wishlist!`);
      throw new Error(error.message);

    } finally {
      dispatch({ type: 'isLoading', payLoad: false });
    }
  }

  // ================================Stripe order
  let StripeOrderHandler = async () => {
    try {
     
      if (!Auth?.currentUser?.uid || !Auth?.currentUser?.email)
      {
        toast.error(`User must be logined in!!!`);
        return;
      }
      
      dispatch({ type: 'isLoading', payLoad: true });
      const stripe = await loadStripe(
        'pk_test_51PSwntA6aVtMiEAWUiwJNkrxhzYksxPg9ynCvgsLm6q7StPWXIrDBYmAGKjcZHWuQPrpFbE7ElFyzf2mXOOgbtj700ks4dYXGs'
      );

      //  ======Getting all the item that curtomer want to buy
      let selectedItems = addToCartList.filter((item) => {
        return item.itemSelectedTobuy === true;
      });

   
      //create body for the stripe means that the customer want to buy
      const body = {
        products: selectedItems,
      };
      //Now create the header
      const headers = {
        'Content-Type': 'application/json',
      };

     


      // ----------------Used to maintain session of the user
      //--------------store the data of the logined user to the localstorage to maintain session
      localStorage.setItem('currentUser', JSON.stringify(currentUserDetails));
      if (!selectedItems.length) {
        toast.error(`You must have atleast one product in cart to continue!!!`);
        return;
      }
      localStorage.setItem('products', JSON.stringify(selectedItems));

      // now call the server
      const response = await fetch(
        'https://e-shop-backend-code-yjw9.vercel.app/api/create-checkout-session',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      
      const session = await response.json(); //it will an id for the checkout page

      // to redirect to the checkout page
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (err) {
      toast.error(`Some Problem occured while processing data!!!`);
    } finally {
      dispatch({ type: 'isLoading', payLoad: false });
    }
  };

  // ===========================Orders
  async function ordersHandler(session_id, currentUserDetail) {
  
    let localStorageUser = JSON.parse(localStorage.getItem("currentUser"));
    let localStorageProducts = JSON.parse(localStorage.getItem("products"));
    if (!session_id || !localStorageUser?.name ||!localStorageUser?.email || !localStorageProducts?.length) return;
    try {


      // ================================storing the data to the firebase
      
      
      
      

      let cartedOrderedItems = JSON.parse(localStorage.getItem('products'));
      localStorage.setItem("currentUser", JSON.stringify({}));
      localStorage.setItem("products", JSON.stringify([]));
      
      if (!cartedOrderedItems.length) {
        toast.error(`Some Problem while storing the ordered items`);
        throw new Error("Orders Products data lost");
      }
    
   
      if (!currentUserDetail?.name)
        throw new Error("User is not logged in");
      
      let collectionRef = collection(fireDatabase, "Orders");
   
      await addDoc(collectionRef, {
        customer_id: currentUserDetail?.id,
        customer_email: currentUserDetail?.email,
        products: cartedOrderedItems,
        date: new Date()
      });

     
      toast.success(` Products successfully saved!!!`);
      console.log("Hello called 2nd time");
      

    } catch (err) {
      console.log(err.message);
      toast.error(`Some Problem occured while storing data!!!`);
      throw new Error(err.message);
    } finally {
    }

  }
  return (
    <ShoppingContext.Provider
      value={{
        // **************Values
        addToCartList,
        cartedBuyList,
        isLoading,
        wishlist,
        session_url,
        error,
        // *************Functions
        totalAmountHandler, //function to handler the total price of the selected items from the cart
        removeFromCart, //function to remove from the cart
        quantityHandler,
        addToCartHandler,
        updataCartedProduct,
        fetchWishlist,
        deleteWishItem,
        addTOWishlist,
        StripeOrderHandler,
        ordersHandler
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

function useCartStorage() {
  const context = useContext(ShoppingContext);
  if (!context)
    throw new Error("You are trying to access undefined context");
  return context;
}

export { ShoppingCart, useCartStorage };
