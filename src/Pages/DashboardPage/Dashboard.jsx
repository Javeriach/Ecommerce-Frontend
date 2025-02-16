// -------------External Imports
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

// -------------------Images
import AddCategoryPng from '../../Images/AddCategoryPng.png';
import AddProductsPng from '../../Images/AddProductsPng.png';
import Logout from '../../Images/Logout.png';

// -------------------Internal Imports
import DashboardSectionBar from '@/AppComponents/Dashboard/DashboardSectionBar/DashboardSectionBar';
import Styles from './Dashboard.module.css';
import Overlay from '../../Reuseable Components/Overlay/Overlay';
import AddCategory from '../../AppComponents/Dashboard/AddCategory/AddCategory';
import AddProducts from '@/AppComponents/Dashboard/AddProdusts/AddProducts';
import { useNavigate } from 'react-router-dom';
import DashBoardMobileView from './DashBoardMobileView';
import axios from 'axios';
import { setShowOverlay } from '@/Redux/Slices/handlersSlice';
import { useDispatch, useSelector } from 'react-redux';

function Dashboard() {
  let { showOverlay} = useSelector(store=>store.handlers);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let LogoutHandler = async () => {
    if (!user) return;
    try {
      await axios.post(
        BASE_USL + '/auth/logout',
        {},
        {
          withCredentials: true,
        }
      );
      navigate('/login');
      toast.success('Logout Successfully!!');
    } catch (err) {
      toast.error('Logout Failed!!');
    }
  };

  return (
    <>
      <section className={`${Styles.section} overflow-hidden`}>
        <div className={Styles.dashboard}>
          <div>
            {['md'].map((expand) => (
              <Navbar key={expand} expand={expand} className={`${Styles.navbar} bg-bayoo`}>
                <div className="d-flex container fluid">
                  <div className={`${Styles.HeadingToggleBtn}  d-flex`}>
                    <div className={Styles.desktopView}>
                      <Navbar.Toggle
                        aria-controls={`offcanvasNavbar-expand-${expand}`}
                      />
                    </div>

                    <div className={`${Styles.brandWidth} `}>
                      <Navbar.Brand className={Styles.headingStyling}>
                        <Link to="/" className={`text-[30px] md:text-[35px] ${Styles.brandName}`}>
                          EShopStore
                        </Link>
                      </Navbar.Brand>
                    </div>
                  </div>

                  <div className={`${Styles.dashboardHeading} `}>
                    <Navbar.Brand className={` text-[30px] md:text-[30px] font-semibold text-white`}>
                      Admin Dashboard
                    </Navbar.Brand>
                  </div>

                  <div
                    className={`${Styles.tabs_section} ${Styles.desktopView}`}
                  >
                    <Navbar.Offcanvas
                      id={`offcanvasNavbar-expand-${expand}`}
                      placement="start"
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title
                          id={`offcanvasNavbarLabel-expand-${expand}`}
                        >
                          Menu
                        </Offcanvas.Title>
                      </Offcanvas.Header>

                      <div className={`${Styles.offcanvasBody}`}>
                        <Offcanvas.Body>
                          <Nav>
                            {/* Add Category */}

                            <Nav.Link href="#action1">
                              <div
                                className={Styles.CrudSection}
                                onClick={() => dispatch(setShowOverlay('AddCategory'))}
                              >
                                <div>
                                  <img src={AddCategoryPng} />
                                </div>
                                <p className="text-white">Add Category</p>
                              </div>
                            </Nav.Link>

                            <Nav.Link
                              onClick={() => dispatch(setShowOverlay('AddProduct'))}
                            >
                              <div className={Styles.CrudSection}>
                                <div>
                                  <img src={AddProductsPng} />
                                </div>
                                <p className="text-white">Add Products</p>
                              </div>
                            </Nav.Link>

                            <Nav.Link>
                              <div
                                className={Styles.CrudSection}
                                onClick={LogoutHandler}
                              >
                                <div>
                                  <img src={Logout} />
                                </div>
                                <p className="text-white">Logout</p>
                              </div>
                            </Nav.Link>
                          </Nav>
                        </Offcanvas.Body>
                      </div>
                    </Navbar.Offcanvas>
                  </div>
                </div>
              </Navbar>
            ))}
          </div>

          {/* {shoppingStoreMessage?.icon && shoppingStoreMessage?.message ? (
            <Message
              icon={shoppingStoreMessage.icon}
              message={shoppingStoreMessage.message}
            />
          ) : (
            ''
          )} */}

          <div className={Styles.desktopView}>
            <DashboardSectionBar />
          </div>

          <div className={`${Styles.alertBox}`}>
            <DashBoardMobileView />
          </div>
        </div>

        <div className="w-100 h-100">
          {showOverlay === 'AddCategory' ? (
            <Overlay>
              <AddCategory  />{' '}
            </Overlay>
          ) : showOverlay === 'AddProduct' ? (
            <Overlay>
              <AddProducts  />
            </Overlay>
          ) : showOverlay === 'updateProduct' ? (
            <Overlay>
              <AddProducts />
            </Overlay>
          ) : (
            ''
          )}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
