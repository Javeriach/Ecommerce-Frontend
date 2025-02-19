import { Link, useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Categories from '../../AppComponents/CategoriesComponent/Categories';
import LandingPage from '../../AppComponents/LandingPageComponent/LandingPage';
import Footer from '../../AppComponents/Footer/Footer';
import LatestProducts from '../../AppComponents/ProductsCardContainer/LatestProducts';
import ItemCardSkeleton from '@/AppComponents/ItemCardSkeleton/ItemCardSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  categoriesHandler,
  loadingHandler,
  productsHandler,
} from '@/Redux/Slices/eshopSlice';
import { BASE_URL } from '@/utils/constants';
import {
  cartedItemsErrorHandler,
  fetchedCartedItemsHandler,
} from '@/Redux/Slices/userProducts';
import toast from 'react-hot-toast';
import { addUser } from '@/Redux/Slices/userSlice';
import Spinner from '@/Reuseable Components/Spinner/Spinner';
function HomePage() {
//========================================STATES============================== ===============
  let { products, categories, loading } = useSelector(
    (store) => store.eshopData
  );

  let { userProfileProductsloading } = useSelector(store => store.userProducts);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  //=========================FETCH THE CATEGORIES AND CARD PRODUCTDS DATA===============
  let fetchData = async () => {
    try {
      dispatch(loadingHandler(true));
      let response = await axios.get(BASE_URL + '/categories', {
        withCredentials: true,
      });

      //DISPATHC THE SAVED THE PRODUCT TO THE REDUX STORE
      dispatch(categoriesHandler(response.data.categories));

      const responseData = await axios.get(BASE_URL + '/fetch-product', {
        withCredentials: true,
      });
      dispatch(productsHandler(responseData.data.products));
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong');
    } finally {
      dispatch(loadingHandler(false));
    }
  };

  //=========================FETCH THE CARTED PRODUCTS DATA==============================

  let fetchCartedProduct = async () => {
    try {
      let response = await axios.get(BASE_URL + '/cart/getproducts', {
        withCredentials: true,
      });
      dispatch(fetchedCartedItemsHandler(response.data.data));
    } catch (error) {
      dispatch(cartedItemsErrorHandler(error.message));
    }
  };
  //=========================FETCH THE USER IF THE USER IS LOGGED IN ====================

  

//=========================USE THE USEEFFECT TO FETCH ALL THE INITAIL DATA===============

  useEffect(() => {
    if (!products?.length || !categories?.length) fetchData();
    fetchCartedProduct();
    
  }, []);
  return (
    <>
      {userProfileProductsloading &&
        <div className="fixed inset-0  flex justify-center items-center z-10">
          <Spinner />
        </div>}
    <div className={``}>
      <LandingPage />

      <div className="w-[100%]">
        <div className="px-4 md:[0px]">
          <h4
            className={` mt-8 md:ml-[30px] text-[30px]  md:text-[35px] font-[600]  mb-2`}
          >
            Categories
          </h4>
        </div>
        {!loading && !categories?.length ? (
          <div className="h-[200px] relative w-screen flex justify-center m-3 ">
            <p className=" w-[80%] ml-[60px] text-center text-bold  mt-[30px] ">
              Categories Fetching Failed...
            </p>
          </div>
        ) : (
          <Categories />
        )}
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="md:[0px] px-[7%] md:p-0 flex  flex-between  justify-between items-center w-screen md:w-[96%]">
          <h4
            className={` mt-8 md:ml-[30px] text-[25px]  md:text-[35px] font-[600]  mb-8`}
          >
            Products
          </h4>
          <Link
            to={
              '/AllResults?resultProducts=lkasdjlfkjflkShopProducts7830klsdjlfkjsdl'
            }
          >
            <button className="btn bg-dark text-light mt-1 text-[15px] rounded-0">
              View All <ArrowRightAltIcon />
            </button>
          </Link>
        </div>
        {loading ? (
          <ItemCardSkeleton tempString={'tempStri'} />
        ) : !loading && !products?.length ? (
          <div className="h-[200px] relative w-screen flex justify-center ">
            <p className=" w-[80%] ml-[60px] text-center text-bold  mt-[30px] ">
              Products Fetching Failed...
            </p>
          </div>
        ) : (
          <LatestProducts />
        )}
      </div>

      <Footer />
      </div>
      </>
  );
}

export default HomePage;
