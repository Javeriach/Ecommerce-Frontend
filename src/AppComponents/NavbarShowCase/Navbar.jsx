import { Link } from 'react-router-dom';

import Styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faHeart,
  faUser,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import { Dashboard, Logout } from '@mui/icons-material';
// ----------------Authenticator imports

import { useAuthenticator } from '../../Contexts/Authenticator';
import { useCartStorage } from '../../Contexts/ShoppingCart';
import Message from '../../Reuseable Components/Message';
import ProductSearch from '@/AppComponents/ProductsSearch/ProductSearch';
import ESLogo from "../../Images/ESLogo.png";

function NavbarShowCase() {
  let { addToCartList, wishlist, message, isLoading } = useCartStorage();
  let {  signOutHandler, currentUserDetails } = useAuthenticator();
  let LogoutHandler = async () => {
    signOutHandler();
  };

  return (
    <>
      {['md'].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className={` h-[80px] w-[screen]    p-0 ${Styles.navbar} w-100`}
        >
          <div className={`w-[100%] ${Styles.innerContainer}`}>
            <div className={`${Styles.nameTogglerSection} flex justify-start`}>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand} m-0`}
                className={Styles.iconToggle}
              />

              <Navbar.Brand>
                <Link className={`${Styles.navbar_brand} flex`} to={'/'}>
                <img className='w-[40px] h-[40px] mt-2 ml-6 rounded-[50px]' src={ESLogo} />
                  <label className=" font-sans">ESHOP</label>
                </Link>
              </Navbar.Brand>
            </div>

            <div className=''>
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                className={`${Styles.Offcanvas} w-50 md:mt-[10px] h-100`}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <h4 className={Styles.navbar_brand}>Menu</h4>
                  </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                  <div className={`w-[300px] ${Styles.navTabs}`}>
                    <Nav >
                      <Nav.Link >Home</Nav.Link>
                      <Nav.Link>About Us</Nav.Link>
                      <Nav.Link>Contact Us</Nav.Link>
                    </Nav>
                  </div>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>

            <div
              className={`${Styles.iconSection} flex justify-center items-center`}
            >
              <Link className="nav-link fs-2 ms-2">
                <ProductSearch />
              </Link>

              <Link className="nav-link fs-2 ms-3 me-4" to={'/AddToCart'}>
                <FontAwesomeIcon
                  className="text-dark ms-2"
                  icon={faCartShopping}
                />
                <label className={`${Styles.notification} bg-primary`}>
                  {addToCartList.length}
                </label>
              </Link>

              {currentUserDetails?.uid ? (
                <div className="mb-2">
                  {['start'].map((direction, index) => (
                    <DropdownButton
                      align="end"
                      key={index}
                      title={
                        <FontAwesomeIcon
                          icon={faUser}
                          className={` text-dark text-[30px] max-[500px]:text-[20px]`}
                        />
                      }
                      id="dropdown-menu-align-start"
                      className={`${Styles.Dropdown} text-[20px] font-medium `}
                    >
                      <Dropdown.Item
                        eventKey="4"
                        className="text-[20px] font-medium"
                      >
                        <Link className="nav-link " to={'/Admin-Dashboard'}>
                          <label className=" bg-white text-dark border  w-[40px] h-[38px]  text-center rounded-[50px] mr-2">
                            <FontAwesomeIcon icon={faUser} />
                          </label>
                          {currentUserDetails?.name?.split(' ')[0]}
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />

                      <Dropdown.Item eventKey="4">
                        <Link className="nav-link  p-0 flex" to={`/wishlist`}>
                          <div><FontAwesomeIcon fontSize={30} icon={faHeart} />
                          <label
                            className={`${Styles.notification} bg-primary mb-2`}
                          >
                            {wishlist.length}
                            </label>
                          </div>
                          
                          <label className='text-[20px] font-medium ml-6'>Wishlist</label> 
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Divider />

                      <Dropdown.Item eventKey="4">
                        <Link
                          className="nav-link text-[20px] font-medium"
                          to={'/Admin-Dashboard'}
                        >
                          <Dashboard /> Dashboard
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />

                      <Dropdown.Item
                        className="text-[20px] font-medium"
                        eventKey="4"
                        onClick={LogoutHandler}
                      >
                        <Logout /> LogOut
                      </Dropdown.Item>
                    </DropdownButton>
                  ))}
                </div>
              ) : (
                <Link className="nav-link fs-2 ms-4 me-2" to="/login">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              )}
            </div>
          </div>
        </Navbar>
      ))}

      {message?.icon && message?.message ? (
        <Message icon={message.icon} message={message.message} />
      ) : (
        ''
      )}
    </>
  );
}

export default NavbarShowCase;
