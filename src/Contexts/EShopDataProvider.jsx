import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import toast from 'react-hot-toast';
// ------------------Firebase Imports

import { storage } from '../Config/Config-firebase';
import { getDownloadURL,deleteObject, ref, uploadBytes} from "firebase/storage";
import { addDoc,getDocs,query, collection,  deleteDoc, setDoc, updateDoc, doc, getDoc, where } from "firebase/firestore";
import { v4 } from "uuid";
import { fireDatabase } from '../Config/Config-firebase';

let EShopDataContext = createContext(); //context


// UseReducer for all states
let reducer = (state, action) => {
 
  switch (action.type) {

    case 'isLoading':
      {
        return { ...state, isLoading: action.payLoad }
      };

    case 'Categories':
      {
        return { ...state, categories: action.payLoad };
      }

       case "EshopData":
      return { ...state, EshopData: action.payLoad , isLoading:false};
    
    case "updateElement":
      {
        return { ...state, elementToUpdate: action.payLoad }
      }
    
    case 'currentProduct':
      return { ...state, currentProduct: action.payLoad, isLoading: false };
    
    case "CategoryStoreData":
        return {...state,CategoryStoreData:action.payLoad,isLoading:false};
    
    case 'message':
       return {...state,shoppingStoreMessage:action.payLoad}
    case 'SearchedProducts':
      return {...state, SearchedProducts:action.payLoad}

    default:
      return state;
  }
};



function EShopDataProvider({ children }) {
 
  // ----UseReducer Hook Implimentation

  let initialState = {
    categories: [],
    EshopData: [],
    isLoading: false,
    currentProduct: {},
    addToCartList: [],
    error: '',
    cartedBuyList: [],
    CategoryStoreData: [],
    elementToUpdate: {},
    SearchedProducts:[]
  };

  let [state, dispatch] = useReducer(reducer, initialState);
  let { elementToUpdate,categories,SearchedProducts,CategoryStoreData, EshopData, isLoading, currentProduct, addToCartList, cartedBuyList, error } = state;
  let [showOverlay, setShowOverlay] = useState();
  // ****************************Use Effect*************************

  useEffect(() => {
    GetCategoriesFromStore();
    fetchData();

  }, [dispatch]);
  


  async function fetchData() {
    try {

      // ----------fetching categories
      dispatch({ type: "isLoading", payLoad: true });
      let ProductsRef = collection(fireDatabase, 'Products');
      let products = await getDocs(ProductsRef);
      let filteredData = products.docs.map(doc => {
        return { ...doc.data(), id:doc.id };
      })

      dispatch({ type: "EshopData", payLoad: filteredData });
    
    } catch (err) {
      dispatch({ type: "isLoading", payLoad: false });

    } finally {
      dispatch({ type: "isLoading", payLoad: false });
    }
  }



  // ==========================================================================

  async function GetCategoriesFromStore() {
      
    const CollectionRefernce = collection(fireDatabase, `Categories`);
    try {
      dispatch({ type: 'isLoading', payLoad: true });
      const data = await getDocs(CollectionRefernce);
      const filteredData = data.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      }
      )
      dispatch({ type: 'Categories', payLoad: filteredData });
     
    } catch (err) {
      
      throw new Error("Categories of Store can't be found");
    }
    finally {
      dispatch({ type: "isLoading", payLoad: false });
    }
    
  }
  
  //++++++++++++++++++++++++++++++++++++=Add Category
  async function addCategoryToDB(CategoryName, ImageFile) {
        

    let categoryFilter = categories?.filter(item =>
    {
      return item.name === CategoryName
    }
    )
    if (categoryFilter.length) {
      toast.success(`Category Already Exist!`);
      return;
    }

    const folderRefernce = ref(storage, `CategoriesImges/${ImageFile.name + v4()}`);
    try {
     
      let data = await uploadBytes(folderRefernce, ImageFile);
      let url = await getDownloadURL(data.ref);
          

      let categoriesCollectionRef = collection(fireDatabase, 'Categories');
      await addDoc(categoriesCollectionRef, {
        name: CategoryName,
        imageUrl: url
      });
      toast.success(`Category added!`);
      GetCategoriesFromStore();
    } catch (err) {
      toast.error(`Category can't be added!`);
      throw new Error(err.message);
    } 
  }
  // ********************************Add Product

  async function AddProductHandler(productDetails) {
   
    if (!productDetails) return;
    try {
      
      let urlArray = [];
      for (let i = 0; i < productDetails.imageFile.length; i++) {
        const folderRef = ref(storage, `Products/${productDetails.category}Images/${productDetails.id + String(i)}`);
        let data = await uploadBytes(folderRef, productDetails.imageFile[i]);
        let url = await getDownloadURL(data.ref);
        urlArray = [...urlArray, url];
      }

      let product = {
        name: productDetails.name,
        price: productDetails.price,
        category: productDetails.category,
        image: urlArray,
        description: productDetails.description,
        id: productDetails.id,
        rating:productDetails.rating
      }
      let singleCategoryCollectionRef = doc(fireDatabase, `Products`, product.id);
      await setDoc(singleCategoryCollectionRef, product);
      toast.success(`Product added !`);

      fetchData();
    } catch {
      toast.error(`Product can't be added!`);
    }
  }
    //--------------------- FUnction to fetch data based on the category

  async function getCategoryData(category) {
      
      dispatch({ type: 'CategoryStoreData', payLoad: [] });
      try {
     
        dispatch({ type: 'isLoading', payLoad: true });
        let collectionRef = collection(fireDatabase, 'Products');
        let data = query(collectionRef, where('category', '==', category));
        const result = await getDocs(data);
        let products = [];

         result.docs.forEach(item => {
          products.push({ ...item.data(), id: item.id });
         });
        
        dispatch({ type: 'CategoryStoreData', payLoad: products });
        dispatch({ type: 'isLoading', payLoad: false });

      } catch(error) {
        throw new Error(error.message);
      }
    }

  // ----------------------Element TO Update
 
 async function UpdateProductHandler(task,product)
  {
   
    if (task == "getElement" ||task == "RemoveElementFronted")
    {
     
      dispatch({ type: "updateElement", payLoad: task == "getElement" ? product:{} })
      
   }
   
    if (task == "updateProduct")
    {
      const docToUpdate = doc(fireDatabase, "Products", product.id);
      try {

        await updateDoc(docToUpdate, product);
        fetchData();
        toast.success(`Product Updated!!`);
      } catch(error)
      {
        toast.error(`Some Error occured while Updating Product!!`);
        throw new Error(error.message);
      }
   }
   
  }
    //--- function to get current product details

  async function getProductDetail(id) {
      dispatch({ type: "currentProduct", payLoad: {} });
        try {
       
          dispatch({ type: "isLoading", payLoad: true });
         
          let docRef = doc(fireDatabase, "Products", id);
          let document = await getDoc(docRef);
       
    
          dispatch({ type: "currentProduct", payLoad: {...document.data(),id:id} });
          dispatch({ type: "isLoading", payLoad: false });

        } catch (err) {
          dispatch({ type: "isLoading", payLoad: false });
          throw new Error(err.message);

        }
      
      
    }





  // ===============================Delte Operation
  async function deleteProductHandler  (item)
  {
    try {
      
      dispatch({ type: 'isLoading', payLoad: true })
      // -----------Procedure to delete the images
      //1-we store the images by using id of the product  as the names of the images and continate the index to 
      //identify the image number in index and also to delted
      
      for (let i = 0; i < item.image.length; i++) {
        let imageRef = ref(storage, `Products/${item.category + 'Images'}/${item.id + String(i)}`);
        await deleteObject(imageRef);
      }

      let docRef = doc(fireDatabase, 'Products', item.id);
      await deleteDoc(docRef);
      toast.success(`Product Removed!`);

      fetchData();
    }
    catch(err) {

      toast.error(`Product can't be removed!`);
      throw new Error(err.message);

    }
   }
  
   function SearchedProductsSetter(data) {
    data.length && dispatch({ type: 'SearchedProducts', payLoad: data });
  }
  
    return (
      <EShopDataContext.Provider
        value={{
          // =============values
          EshopData,
          isLoading,
          currentProduct,
          categories,
          CategoryStoreData,
          elementToUpdate,
          showOverlay,
          SearchedProducts,
          
          //  =============functioons
          getCategoryData,
          setShowOverlay,
          getProductDetail,
          deleteProductHandler,
          AddProductHandler,
          addCategoryToDB,
          UpdateProductHandler,
          dispatch,
          SearchedProductsSetter
        }}
      >
        {children}
      </EShopDataContext.Provider>
    );
  }


function useEShopData() {
  const context = useContext(EShopDataContext);
  if (!context) throw new Error('You are trying to Access Undefined Data');
  return context;
}

export { EShopDataProvider, useEShopData };
