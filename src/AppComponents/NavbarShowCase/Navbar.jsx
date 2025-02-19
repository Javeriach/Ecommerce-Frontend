import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// ---------------icons
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LoginIcon from '@mui/icons-material/Login';
// ----------------Authenticator imports
import ProductSearch from '@/AppComponents/ProductsSearch/ProductSearch';
import ESLogo from '../../Images/ESLogo.png';
import Aos from 'aos';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import toast from 'react-hot-toast';
import { removeUser } from '@/Redux/Slices/userSlice';
import { fetchedCartedItemsHandler, fetchedWishedItemsHandler } from '@/Redux/Slices/userProducts';
import { ListOrdered } from 'lucide-react';

function NavbarShowCase() {

  let { products: cartedProducts } = useSelector(store => store.userProducts.cartedItems);
  let {products:wishlist} = useSelector(store =>store.userProducts.wishedItems);
  let user = useSelector((store) => store.user);  
  let [navDialogue, setNavDialogue] = useState(false);
  let [toggleDropDown, setToggleDropDown] = useState(false);
  let dropdownBtnRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    Aos.init({ duration: 100 });
  }, []);

  console.log(user);
  // --------Handlers
  let LogoutHandler = async () => {
    try {
      await axios.post(
        BASE_URL + '/auth/logout',
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(fetchedCartedItemsHandler([]));
      dispatch(fetchedWishedItemsHandler([]));
      navigate('/login');
      toast.success('Logout Successfully!!');
    } catch (err) {
      console.log(err);
      toast.error('Logout Failed!!');
    }
  };

  let handleMenu = () => {
    setNavDialogue((ps) => !ps);
  };

  let handleDropDown = (e) => {
    e.preventDefault();

    setToggleDropDown((ps) => !ps);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownBtnRef.current &&
        !dropdownBtnRef.current.contains(event.target)
      ) {
        console.log('Clicked outside the button');
        // Call your function here
        setToggleDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <nav className="fixed w-full  z-[1000] top-[0%] flex justify-between items-center bg-white py-3 md:pe-12 overflow-x-hidden">
      <Link className="flex gap-1 items-center text-[30px] font-[600]" to={'/'}>
        <img className="w-[40px] h-[40px]  ml-6 rounded-[50px]" src={ESLogo} />
        EShop
      </Link>

      {/* --------------------------------For large Screens -Menu */}
      <div id="nav-menu" className="hidden md:flex gap-8">
        {/* Add to cart */}

        <Link className="text-[30px] ">
          <ProductSearch />
        </Link>

        {/* Wishlist page */}

        <Link className=" p-0 flex items-center" to={`/wishlist`}>
          <div>
            <FontAwesomeIcon fontSize={33} icon={faHeart} />
            <label
              className={` bg-blue-700 rounded-[20px] w-[20px] text-white text-[15px] absolute  text-center mb-2`}
            >
              {wishlist?.length}
            </label>
          </div>
        </Link>

        <Link className="flex  items-center" to={'/AddToCart'}>
          <div>
            <ShoppingCartIcon sx={{ fontSize: 40 }} />
            <label
              className={` bg-blue-700 rounded-[20px] w-[20px] ml-0 text-white text-[15px] absolute  text-center mb-2`}
            >
              {cartedProducts?.length}
            </label>
          </div>
        </Link>
        {/* -------------dropdown */}
        {!user?._id ? (
          <Link to={'/Login'} className="font-medium text-[30px]">
            Login
          </Link>
        ) : (
          <div className="main-wrapper relative group" ref={dropdownBtnRef}>
            <button
              className=" text-[25px]  border-gray-500 w-auto font-medium"
              onClick={handleDropDown}
              id="dropdown"
            >
              <label className="text-[20px] mt-1 ml-2">
                {user?.firstName}
              </label>
              {toggleDropDown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </button>
            {toggleDropDown && (
              <div
                transition
                className="absolute right-0 z-10 mt-0 w-auto h-auto py-3 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {
                  <>
                    <div className="  hover:bg-gray-300 cursor-pointer w-[100%] px-3 h-8 flex items-center  ">
                      <Link
                        to={'/Admin-Dashboard'}
                        onClick={() => setToggleDropDown((ps) => !ps)}
                        className="text-lg flex justify-around"
                      >
                        {/* {user?.name?.split(' ')[0]} */}

                        <DashboardIcon />
                        <label className="ms-[10px] text-lg flex justify-around">
                          Dashboard
                        </label>
                      </Link>
                    </div>
                    <div className="h-[1px] bg-slate-600 w-[100%]"> </div>{' '}
                  </>
                }
                
                  <Link to={"/myorders"} className=" hover:bg-gray-300 cursor-pointer w-[100%] px-3 h-8 flex items-center ">
                  <ListOrdered/>
                  <label
                    // onClick={LogoutHandler}
                    className="ms-[10px] text-lg flex justify-around"
                  >
                   My Orders
                  </label>
                </Link>


                <div className=" hover:bg-gray-300 cursor-pointer w-[100%] px-3 h-8 flex items-center ">
                  <LogoutIcon />
                  <label
                    onClick={LogoutHandler}
                    className="ms-[10px] text-lg flex justify-around"
                  >
                    LOGOUT
                  </label>
                  </div>
                  
              </div>
            )}
          </div>
        )}
      </div>

      {/* ------------------Small screen navbar bar content */}
      <div className="flex md:hidden h-full justify-around items-center w-[90px] ">
        <ProductSearch />

        <button className="me-2 " onClick={() => setNavDialogue(true)}>
          {' '}
          <MenuIcon sx={{ fontSize: 45 }} />
        </button>
      </div>

      {/* --------------for small screens side bar menu*/}
      {navDialogue && (
        <div
          data-aos="fade-right"
          className=" fixed bg-white inset-0 z-[1000] p-3  md:hidden overflow-x-hidden"
          onClick={() => setNavDialogue(false)}
        >
          <div id="nav-bar" className=" flex justify-between">
            {/* ---------buttons */}
            <Link className="flex gap-1 items-center text-[30px] font-[600]">
              <img
                className="w-[40px] h-[40px]  ml-6 rounded-[50px]"
                src={ESLogo}
              />
              EShop
            </Link>

            <button
              className="p-2 md:hidden"
              onClick={(e) => {
                e.preventDefault();
                setNavDialogue(false);
              }}
            >
              {' '}
              <CloseIcon sx={{ fontSize: 30 }} />
            </button>
          </div>
          {/* -----------menu */}
          <div className="mt-6">
            <Link
              className="font-medium cursor-pointer m-1 p-3 py-2 flex items-center justify-between hover:bg-gray-50 rounded-lg"
              to="/"
            >
              <div className="flex items-center h-full w-full">
                <HomeIcon sx={{ fontSize: 30 }} />
                <label className="text-[20px] mt-1 ml-2">Home</label>
              </div>

              <ChevronRightIcon sx={{ fontSize: 30 }} />
            </Link>
            <div className="h-[1px] bg-black"></div>

            {/* Add to cart */}
            <Link
              className="font-medium cursor-pointer m-1 p-3 py-2 flex items-center justify-between hover:bg-gray-50 rounded-lg"
              to="/AddToCart"
            >
              <div className="flex items-center h-full w-full">
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
                <label className="text-[20px] mt-1 ml-2">Cart</label>
              </div>

              <ChevronRightIcon sx={{ fontSize: 30 }} />
            </Link>

            {/* Dashboard */}

            <div className="h-[1px] bg-black"></div>
            {
              <>
                <Link
                  className="font-medium cursor-pointer m-1 p-3 py-2  flex items-center justify-between hover:bg-gray-50 rounded-lg"
                  to="/Admin-Dashboard"
                >
                  <div className="flex items-center h-full w-full">
                    <DashboardIcon sx={{ fontSize: 30 }} />
                    <label className="text-[20px] mt-1 ml-2">Dashboard</label>
                  </div>

                  <ChevronRightIcon sx={{ fontSize: 30 }} />
                </Link>
                <div className="h-[1px] bg-black"></div>
              </>
            }

            {/* Wishlist page */}

            <Link
              className="font-medium cursor-pointer m-1 p-3 py-2 flex items-center justify-between hover:bg-gray-50 rounded-lg"
              to="/wishlist"
            >
              <div className="flex items-center h-full w-full">
                <FontAwesomeIcon fontSize={30} icon={faHeart} />
                <label className="text-[20px] mt-1 ml-2">Wishlist</label>
              </div>

              <ChevronRightIcon sx={{ fontSize: 30 }} />
            </Link>
            <div className="h-[1px] bg-black"></div>

            {/* ------Logged in user */}
            {user?._id && (
              <Link
                className="font-medium cursor-pointer m-1 p-3 py-2 flex items-center justify-between hover:bg-gray-50 rounded-lg"
                to="/Login"
              >
                <div className="flex items-center h-full w-full">
                  <PersonIcon sx={{ fontSize: 35 }} />
                  <label className="text-[20px] mt-1 ml-2">
                    {user?.firstName}
                  </label>
                </div>
              </Link>
            )}

            {/* User Login  button*/}

            <div className="">
              <button className="bg-blue-800 block w-full  text-left pl-[30px] hover:bg-white hover:text-black">
                {!user._id ? (
                  <Link
                    className="font-medium cursor-pointer m-3   flex items-center justify-between  rounded-lg"
                    to="/Login"
                  >
                    <div className="flex items-center h-full w-full">
                      <LoginIcon sx={{ fontSize: 30 }} />
                      <label className="text-[20px] mt-1 ml-2">LOGIN</label>
                    </div>
                  </Link>
                ) : (
                  <Link
                    className="font-medium cursor-pointer m-3  flex items-center justify-between  rounded-lg"
                    to="/"
                    onClick={LogoutHandler}
                  >
                    <div
                      className="flex items-center h-full w-full"
                      onClick={() => handleMenu(false)}
                    >
                      <LogoutIcon sx={{ fontSize: 30 }} />
                      <label className="text-[20px] mt-1 ml-2">LOGOUT</label>
                    </div>
                  </Link>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarShowCase;
