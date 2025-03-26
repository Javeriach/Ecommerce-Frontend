import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';

function OrderSummery() {
  let { products } = useSelector((store) => store.userProducts.cartedItems);
  let [itemsToPurchase, setItemsToPurchase] = useState([]);
  let [amount, setTotalAmount] = useState(0);
  let  currentOrderDetails  = useSelector(store => store.userorders.currentOrderDetails);
  console.log(currentOrderDetails);

  useEffect(() => {
    let filteredItems = products?.filter((item) => {
      return item?.selectedForPurchase;
    });

    let tempAmount = amount;
    setItemsToPurchase(filteredItems);
    filteredItems?.forEach((item) => {
      tempAmount += item.quantity * item.product.price;
    });
    setTotalAmount(tempAmount);
  }, [products]);

  const makePayment = async () => {
    
    const stripe = await loadStripe("pk_test_51PSwntA6aVtMiEAWUiwJNkrxhzYksxPg9ynCvgsLm6q7StPWXIrDBYmAGKjcZHWuQPrpFbE7ElFyzf2mXOOgbtj700ks4dYXGs");

    let body = {
      products: itemsToPurchase,
      address: currentOrderDetails
    };

   
    const response = await axios.post(BASE_URL + "/checkout", body, { withCredentials: true });
    console.log(response);
    const result = stripe.redirectToCheckout({
        sessionId:response.data.id
    });
    
    
    if(result.error){
        console.log(result.error);
    }
}

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3 border border-opacity-45 border-black">
      <div className="space-y-4 h-[200px] overflow-y-auto">
        {itemsToPurchase?.map((item) => {
          return (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={item?.product?.images[0]}
                  alt="Green Dress"
                  className="w-12 h-12 object-cover rounded-md"
                />
                <span>{item.product.name}</span>
              </div>
              <span className="text-red-500 font-semibold">
                {item.product.price * item.quantity}
              </span>
            </div>
          );
        })}
      </div>
      <hr className="my-4" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">{amount}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold">$250</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${amount + 250}</span>
        </div>
      </div>
      <button onClick={makePayment} className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-600">
        PLACE ORDER
      </button>
    </div>
  );
}

export default OrderSummery;
