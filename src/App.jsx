import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css";

// import { EShopDataProvider } from './Contexts/EShopDataProvider';
// import { Authenticator } from './Contexts/Authenticator';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'bootstrap';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import ProductsDetails from './Pages/ProductDetails/ProductsDetails';
// import AddToCartPage from './Pages/AddToCartPage/AddToCartPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import CatogoryStore from './Pages/CategoriesStore/CatogoryStore';
import Dashboard from './Pages/DashboardPage/Dashboard';
import DashboardProducts from './AppComponents/Dashboard/DashboardProducts/DashboardProducts';
// import DashboardUsers from './AppComponents/Dashboard/DashboardUsers/DashboardUsers';
// import DashboardOrders from './AppComponents/Dashboard/DashboardOrders/DashboardOrders';
// // import { ShoppingCart } from './Contexts/ShoppingCart';
// import Cancel from './Pages/CancelPaymentPage/Cancel';
// import Sucess from './Pages/SuccessPage/Sucess';
// import WishlistPage from './Pages/WishlistPage/WishlistPage';
// import SignUpPage from './Pages/SignUpPage/SignUpPage';
import AppParentRouter from './Pages/AppParentRouter/AppParentRouter';
// import { OrdersUsersContext } from './Contexts/OrdersUsersContext';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './Redux/Store';
// import AllResultProducts from './Pages/AllResultProducts/AllResultProducts';
// import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function App() {
 
 
  
    return (
  
          <Provider store={store}>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppParentRouter />}>
                  <Route path="/" index element={<HomePage />} />

                  <Route
                    path="/Categories/:categoryName/:categoryId"
                    element={<CatogoryStore />}
                  />

                  {/* <Route
                    path="/Categories/:category/Products"
                    element={<ProductsDetails />}
                  /> */}

                  {/* Latest Products route */}

                  <Route path="/latestProducts" element={<ProductsDetails />} />
                  {/* <Route
                    path="/wishlist/ProductDetails"
                    element={<ProductsDetails />}
                  /> */}

                  {/* <Route path="/AddToCart" element={<AddToCartPage />} /> */}
                  <Route path="/login" element={<LoginPage />} />
                  {/* <Route path="/signup" element={<SignUpPage />}></Route> */}
</Route>
                  {/* <Route
                    path="/ProductDetails"
                    element={<ProductsDetails />}
                  ></Route>
                  <Route path="/cancel" element={<Cancel />} />
                  <Route path={`/success`} element={<Sucess />} />
                  <Route path="/wishlist" element={<WishlistPage />}></Route>
                  <Route path="/AllResults" element={<AllResultProducts />} />
                </Route> */}

               
              <Route path="/Admin-Dashboard" element={
                // <ProtectedRoute>
                  <Dashboard />
                // </ProtectedRoute>
              }>
                    <Route
                      index
                      element={<DashboardProducts />}
                    ></Route>
                    {/* <Route
                      path="/Admin-Dashboard/Users"
                      element={<DashboardUsers />}
                    ></Route>
                    <Route
                      path="/Admin-Dashboard/Orders"
                      element={<DashboardOrders />}
                    ></Route> */}
                  </Route>
               
              </Routes>
            </BrowserRouter>
          </Provider>
      
  );
}

export default App;
