import { Outlet, useNavigate } from 'react-router-dom';

import NavbarShowCase from '@/AppComponents/NavbarShowCase/Navbar';
import TextBannerCarousel from '@/AppComponents/NavbarShowCase/TextBannerCarousel';
import Spinner from '../../Reuseable Components/Spinner/Spinner';
import { useEffect } from 'react';
import axios from 'axios';
import { addUser } from '@/Redux/Slices/userSlice';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/utils/constants';
import { useDispatch } from 'react-redux';
import { fetchedWishedItemsHandler, wishedItemsErrorHandler } from '@/Redux/Slices/userProducts';
// import Spinner from '@/Reuseable Components/Spinner/Spinner';

function AppParentRouter() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const fetchUser = async () => {
    console.log("Callled");
    try {
      const user = await axios.get(`${BASE_URL}/profile-view`, {
        withCredentials: true,
      });
      dispatch(addUser(user.data?.user));
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        navigate('/');
      } else {
        console.log(error);
        toast.error('Something went wrong!!');
        throw new Error('Something  went wrong!!');
      }
      
    }
  };

  let fetchWishListProducts = async () => {
    try {
      let response = await axios.get(BASE_URL + '/wislist/getproducts', {
        withCredentials: true,
      });
      dispatch(fetchedWishedItemsHandler(response.data.data));
    } catch (error) {
      dispatch(wishedItemsErrorHandler(error.message));
    }
  };
  useEffect(() => {
    fetchUser();
    fetchWishListProducts();
  }, []);

  return (
    <div className="md:pt-12 pt-14 overflow-x-hidden">
      <NavbarShowCase />

      <div className={`fixed z-[1000] flex w-[100%] justify-center mt-[120px]`}>
        {/* {isLoading || authLoading ? <Spinner /> : ''} */}
      </div>

      <TextBannerCarousel />
      <Outlet />
    </div>
  );
}

export default AppParentRouter;
