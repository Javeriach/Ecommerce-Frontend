import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'bootstrap';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import CatogoryStore from './Pages/CategoriesStore/CatogoryStore';
// import DashboardUsers from './AppComponents/Dashboard/DashboardUsers/DashboardUsers';
// import DashboardOrders from './AppComponents/Dashboard/DashboardOrders/DashboardOrders';
import Cancel from './Pages/CancelPaymentPage/Cancel';
import Sucess from './Pages/SuccessPage/Sucess';
import AppParentRouter from './Pages/AppParentRouter/AppParentRouter';
// import { OrdersUsersContext } from './Contexts/OrdersUsersContext';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import{ lazy,Suspense} from "react";

// import ProtectedRoute from './ProtectedRoute/ProtectedRoute';


function App() {
  const ProductsDetails = lazy(() => import('./Pages/ProductDetails/ProductsDetails'));
  const Checkout = lazy(() => import('./Pages/CheckOutPage/Checkout'));
  const  MyOrdersPage = lazy(() => import('./Pages/MyOrders/MyOrders'));
  const AllResultProducts = lazy(() => import('./Pages/AllResultProducts/AllResultProducts'));
  const WishlistPage= lazy(() => import('./Pages/WishlistPage/WishlistPage'));
  const DashboardProducts=lazy(() => import('./AppComponents/Dashboard/DashboardProducts/DashboardProducts'));
  const Dashboard = lazy(() => import('./Pages/DashboardPage/Dashboard'));
  const AddToCartPage=lazy(() => import('./Pages/AddToCartPage/AddToCartPage'));

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

            <Route
              path="/Categories/:categoryName/:categoryId/Product"
              element={<Suspense fallback={<h1>Loading...</h1>}><ProductsDetails /></Suspense>}
            />

            {/* Latest Products route */}
            <Route path="/latestProducts" element={<Suspense fallback={<h1>Loading...</h1>}> <ProductsDetails /></Suspense>} />

            {/* ====================================WishList==================================== */}
            <Route
  path="/wishlist"
  element={
    <Suspense fallback={<h1>Loading...</h1>}>
      <WishlistPage />
    </Suspense>
  }
/>
<Route
  path="/wishlist/ProductDetails"
  element={
    <Suspense fallback={<h1>Loading...</h1>}>
      <ProductsDetails />
    </Suspense>
  }
/>
            {/* ====================================Add to Cart==================================== */}

            <Route path="/AddToCart" element={<Suspense fallback={<h1>Loading...</h1>}><AddToCartPage /></Suspense>} />
            {/* ====================================My Orders==================================== */}
            <Route path="/myorders" element={<Suspense fallback={<h1>Loading...</h1>}> <MyOrdersPage/></Suspense>} />
 
            <Route path="/login" element={<LoginPage />} />

            <Route path="/ProductDetails" element={<ProductsDetails />}></Route>
            <Route path="/Order-products" element={<Suspense fallback={<h1>Loading...</h1>}> <Checkout /></Suspense>}></Route>
            <Route path="/cancel" element={<Cancel />} />
            <Route path={`/success`} element={<Sucess />} />

            <Route path="/AllResults" element={<Suspense fallback={<h1>Loading...</h1>}><AllResultProducts /> </Suspense>} />
          </Route>

          <Route
            path="/Admin-Dashboard"
            element={
              // <ProtectedRoute>
             <Suspense fallback={<h1>Loading...</h1>}>  <Dashboard /></Suspense> 
              // </ProtectedRoute>
            }
          >
            <Route index element={<Suspense fallback={<h1>Loading...</h1>}> <DashboardProducts /></Suspense> }></Route>
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
