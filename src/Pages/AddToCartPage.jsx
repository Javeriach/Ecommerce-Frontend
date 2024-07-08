// -------------------External Imports
import Lottie from 'lottie-react';
// -------------------Internal Imports
import Styles from './AddToCartPage.module.css';
import Footer from '../Components/Footer';
import { useEShopData } from '../Contexts/EShopDataProvider';
import CartedSingleItem from '../Reuseable Components/CartedSingleItem';
import EmptyCart from '../Lotties/EmptyCart.json';
import { useCartStorage } from '../Contexts/ShoppingCart';

// -----------------------------Function

function AddToCartPage() {
  // -------------------------State Variables
  let { addToCartList, cartedBuyList, error, StripeOrderHandler } =
    useCartStorage();

  let amount = 0;
  addToCartList.forEach((element) => {
    if (element.itemSelectedTobuy)
      amount = amount + element.price * element.itemQuantity;
  });

  let buyList = addToCartList.filter((item) => {
    return item.itemSelectedTobuy;
  });

  return (
    <div>
      <div className="p-4">
        <h5 className={`${Styles.shoppingCart} mb-0`}>Shopping Cart</h5>
        {error?.type == 'cart' &&
        error?.errorText == 'Carted Products fetching failed' ? (
          <div className="w-[100%] h-[200px] flex justify-center items-center">
            <p className="text-center">Carted Items fetching failed</p>
          </div>
        ) : addToCartList.length === 0 ? (
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
          <div className=" w-[100%] flex justify-center ">
            <div className="w-[70%] flex flex-col md:flex-row justify-between bg-white items-center">
              <table>
                <tbody>
                  {addToCartList.map((element, index) => (
                    <tr>
                      <CartedSingleItem element={element} key={index} />
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className=" border border-dark border-4 w-[300px] py-[10px] px-[20px]  flex flex-col items-center">
                <label className="text-[30px] font-[600] w-[100%]  text-center">Order Summary</label>

                    <table className='w-[270px] '>
                      
                  
                      <tbody  >
                  <tr>
                    <td className='bg-white '>Subtotal Items</td>
                    <td className='bg-white  text-end'>{buyList?.length}</td>
                  </tr>

                  <tr>
                    <td className='  '>Shipping Fee</td>
                    <td className=' text-end text-end'>{amount > 30 ? '$5' : '0$'}</td>
                  </tr>
                  <tr>
                    <td><p className='font-[700] text-[20px]'>Total Price:</p></td>
                        <td><p className='font-[700] text-end'>${amount}</p></td>
                        </tr>
                        </tbody>
                </table>

                    <button onClick={StripeOrderHandler} className='bg-dark text-white p-2 mt-[20px] w-[200px]'>
                  PROCEED TO CHECKOUT
                </button>
                     
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AddToCartPage;
