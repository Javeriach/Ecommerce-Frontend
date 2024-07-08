import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { faL, faTrash } from '@fortawesome/free-solid-svg-icons';
import Styles from './CartedSingleItem.module.css';
import { useCartStorage } from '../Contexts/ShoppingCart';
import { Spinner } from 'react-bootstrap';

function CartedSingleItem({ element }) {
  
  if (!element) return;
  let {
    removeFromCart,
    totalAmountHandler,
    updataCartedProduct
  } = useCartStorage();

  let [itemQuantity, setItemQuantity] = useState(element.itemQuantity);

  
  let navigate = useNavigate();

  useEffect(() => {
   
    let value = itemQuantity;
    if (!value == element.itemQuantity) return;
        updataCartedProduct("itemQuantity", value, element.id);
     
  }, [itemQuantity]);


  
  //==========Effect to update the checkbox whenever checkbox is updated
  let checkBoxHandler = ()=>
  {
    
    let value = !element.itemSelectedTobuy;
    console.log(value);
    updataCartedProduct("checkbox", value, element.id);
  }

  let removeItem =async () =>
  {
  
     
      await removeFromCart(element.id)
    
  }
  

 

  return (
    <div className={` my-4 flex h-[110px] w-[300px] md:w-[350px] p-0`}>
      
      <tr className='d-flex'>
        <td>
          {/* --------Check Box */}
          <div>
            <input
              checked={element.itemSelectedTobuy}
              onChange={checkBoxHandler}
              className="me-2 cursor-pointer"
              type="checkbox"
            />
          </div>
        </td>
        

          {/* image */}
        <td>
          <div className={`d-flex`}>
        
            <img
              className={`w-[100px] h-[100px] cursor-pointer`}
              onClick={() => navigate(`/ProductDetails?itemId=${element.regularItemId}&quantity=${element.itemQuantity}`)}
              src={element.imageURL}
              alt={element.name}
            />
          </div>
        </td>
        
        <td>
        

          {/* --------------text details */}
          <div className="font-[500] ms-3 flex flex-col  h-[100px] mb-[20px]">
            {/* -title */}
              <p
                className={` text-[15px] mt-0`}
                onClick={() => navigate(`/ProductDetails?itemId=${element.regularItemId}&quantity=${element.itemQuantity}`)}
              >
                {element.name}
              </p>
              <div className=" flex flex-col h-[100%] justify-between ">
                {/* Quantity */}
                <label htmlFor="" className={`font-medium`}>
                   Price:${element.price}
                </label>
                
                <div id="quantity" className='flex justify-between w-[150px]'>
                  
                  <div className={`border w-[70px] h-[25px] md:h-[30px] flex justify-between items-center font-medium`}>
                    <p
                     className='text-[20px] cursor-pointer'
                      onClick={() => {
                        setItemQuantity((ps) => (ps > 1 ? ps - 1 : ps));
                      }}
                    >
                     &#8722;
                    </p>
                
                  <span className='text-[15px] md:text-[20px] block '>
                    {itemQuantity}
                  </span>

               
                    <label
                      className='text-[20px]  cursor-pointer'
                      onClick={() => {
                        setItemQuantity((ps) => ps + 1);
                      }}
                     
                    >
                      &#43;
                    </label>
                  </div>
                  <label
                  className={`text-[15px] md:text-[18px] font-[500] cursor-pointer underline underline-offset-4 `}
                  onClick={removeItem}
                >
                 Remove
                </label>
                </div>

             
              </div>
            </div>

            <div />
        
        </td>
      </tr>
    </div>
  );
}

export default CartedSingleItem;
