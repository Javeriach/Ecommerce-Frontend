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

import { useAuthenticator } from '../../Contexts/Authenticator';
import { useCartStorage } from '../../Contexts/ShoppingCart';
import ProductSearch from '@/AppComponents/ProductsSearch/ProductSearch';
import ESLogo from '../../Images/ESLogo.png';

function NavbarShowCase() {
  let { addToCartList, wishlist } = useCartStorage();
  let { signOutHandler, currentUserDetails } = useAuthenticator();
  let [navDialogue, setNavDialogue] = useState(false);
  let [toggleDropDown, setToggleDropDown] = useState(false);
  let dropdownBtnRef = useRef();
  let navigate = useNavigate();
  // --------Handlers
  let LogoutHandler = async (e) => {
    e.preventDefault();
    try {
      await signOutHandler();
      navigate('/');
    } catch {}
    setNavDialogue(false);
    setToggleDropDown(false);
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
    <nav className="fixed w-full  z-[1000] top-[0%] flex justify-between items-center bg-white py-3 md:pe-12">
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
              {wishlist.length}
            </label>
          </div>
        </Link>

        <Link className="flex  items-center" to={'/AddToCart'}>
          <div>
            <ShoppingCartIcon sx={{ fontSize: 40 }} />
            <label
              className={` bg-blue-700 rounded-[20px] w-[20px] ml-0 text-white text-[15px] absolute  text-center mb-2`}
            >
              {addToCartList.length}
            </label>
          </div>
        </Link>
        {/* -------------dropdown */}
        {!currentUserDetails.uid ? (
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
                {currentUserDetails?.name?.split(' ')[0]}
              </label>
              {toggleDropDown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </button>
            {toggleDropDown && (
              <div
                transition
                className="absolute right-0 z-10 mt-0 w-auto h-auto py-3 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                  {currentUserDetails?.email == "javeriakanwal904@gmail.com" &&
                    <>
                      <div className="  hover:bg-gray-300 cursor-pointer w-[100%] px-3 h-8 flex items-center  ">
                  <Link
                    to={'/Admin-Dashboard'}
                    onClick={() => setToggleDropDown((ps) => !ps)}
                    className="text-lg flex justify-around"
                  >
                    {/* {currentUserDetails?.name?.split(' ')[0]} */}

                    <DashboardIcon />
                    <label className="ms-[10px] text-lg flex justify-around">
                      Dashboard
                    </label>
                  </Link>
                </div>
                <div className="h-[1px] bg-slate-600 w-[100%]"> </div>  </> 
                  }
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
      <div className="flex md:hidden h-full justify-center items-center w-[200px] pe-3">
        <ProductSearch />

        <button className="p-2 " onClick={() => setNavDialogue(true)}>
          {' '}
          <MenuIcon sx={{ fontSize: 40 }} />
        </button>
      </div>

      {/* --------------for small screens side bar menu*/}
      {navDialogue && (
        <div
          className=" fixed bg-white inset-0 z-[1000] p-3  md:hidden "
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
           { currentUserDetails?.email == "javeriakanwal904@gmail.com" && <Link
              className="font-medium cursor-pointer m-1 p-3 py-2  flex items-center justify-between hover:bg-gray-50 rounded-lg"
              to="/Admin-Dashboard"
            >
              <div className="flex items-center h-full w-full">
                <DashboardIcon sx={{ fontSize: 30 }} />
                <label className="text-[20px] mt-1 ml-2">Dashboard</label>
              </div>

              <ChevronRightIcon sx={{ fontSize: 30 }} />
            </Link>}

            <div className="h-[1px] bg-black"></div>
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
            {currentUserDetails.uid && (
              <Link
                className="font-medium cursor-pointer m-1 p-3 py-2 flex items-center justify-between hover:bg-gray-50 rounded-lg"
                to="/Login"
              >
                <div className="flex items-center h-full w-full">
                  <PersonIcon sx={{ fontSize: 35 }} />
                  <label className="text-[20px] mt-1 ml-2">
                    {currentUserDetails?.name?.split(' ')[0]}
                  </label>
                </div>
              </Link>
            )}

            {/* User Login  button*/}

            <div className="">
              <button className="bg-blue-800 block w-full  text-left pl-[30px] hover:bg-white hover:text-black">
                {!currentUserDetails.uid ? (
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
