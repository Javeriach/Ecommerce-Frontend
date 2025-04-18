// -------------------External Imports
import Lottie from 'lottie-react';
// -------------------Internal Imports
import Styles from './AddToCartPage.module.css';
import CartedSingleItem from '../../Reuseable Components/CartedSingleItem/CartedSingleItem';
import EmptyCart from '../../Lotties/EmptyCart.json';
import { useEffect, useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import { useSelector } from 'react-redux';
import Spinner from '@/Reuseable Components/Spinner/Spinner';
import { Link } from 'react-router-dom';

// -----------------------------Function

function AddToCartPage() {
  // -------------------------State Variables
  let { products: cartedProducts, error } = useSelector(
    (store) => store.userProducts.cartedItems
  );
  let { userProfileProductsloading } = useSelector(
    (store) => store.userProducts
  );
  let [amount, setAmount] = useState(250);

  useEffect(() => {
    let buyList = cartedProducts.filter((item) => {
      return item.selectedForPurchase;
    });

    let totalAmount = 0;
    buyList.forEach((element) => {
      totalAmount += element.quantity * element.product.price;
    });

    setAmount(totalAmount);
  }, [cartedProducts]);

  return (
    <>
      {userProfileProductsloading && (
        <div className="fixed inset-0  flex justify-center items-center z-10">
          <Spinner />
        </div>
      )}
      <div className=" overflow-hidden">
        <div className="p-4 w-[100%]">
          <h5 className={`text-[40px] font-bold text-center mb-4`}>Cart</h5>
          {error ? (
            <div className="w-[100%] h-[200px] flex justify-center items-center">
              <p className="text-center">Carted Items fetching failed</p>
            </div>
          ) : cartedProducts?.length === 0 ? (
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
              <Lottie className={Styles.EmptyCart} animationData={EmptyCart} />
              <div>
                <h4 className="fw-bold text-center">No Carted Items</h4>
                <p className="text-center">
                  Whenever you select any item
                  <br /> you will see all that selected items here{' '}
                </p>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="flex flex-col md:flex-row  justify-center bg-white items-center  ">
                <div className=" w-screen  h-[380px] md:h-auto overflow-y-auto overflow-x-hidden flex justify-center ">
                  <div className="md:w-[90%] w-full ">
                    <table className=" w-full ">
                      <tr className="hidden md:table-header-group ">
                        <th className="text-[35px]">Product</th>
                        <th className="text-[35px]">Price</th>
                        <th className="text-[35px]">Subtotal</th>
                      </tr>

                      {cartedProducts.map((product, index) => (
                        <tr className="flex justify-center md:table-row h-[100px] mt-2">
                          <CartedSingleItem element={product} key={index} />
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              </div>

              <hr />
              <div className="w-full flex justify-center items-center h-[70px]">
                <h5 className="font-[700] md:text-[30px] h-[60px] items-center w-auto flex">
                  {' '}
                  Total Price
                  <FiberManualRecordIcon sx={{ fontSize: 20 }} /> ${amount}
                </h5>
                <FiberManualRecordIcon sx={{ fontSize: 20 }} />
                <Link to="/Order-products">
                  <button
                    // onClick={StripeOrderHandler}
                    className="bg-dark text-white w-auto p-2 md:w-[200px] ms-1 text-[10px]  md:text-[20px] "
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AddToCartPage;
