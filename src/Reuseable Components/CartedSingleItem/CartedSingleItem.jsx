import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { product_Quantity_Updation_Handler, product_Selected_For_Purchase_Handler, removeItemFromCartHandler, userProductsloadingHandler } from '@/Redux/Slices/userProducts';


function CartedSingleItem({ element })
{
  if (!element) return;
  let [itemQuantity, setItemQuantity] = useState(element.quantity);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() =>
  {
    setItemQuantity(element?.quantity);
  }, [element])
  
  //========================================UPDATE THE PRODUCT QUANTITY=============================

  let updateProductQuantityHandler = async () =>
  {
    if (itemQuantity < 1) return;
    try {
      dispatch(userProductsloadingHandler(true));
      await axios.patch(BASE_URL + `/cart/update-quantity/${element.product._id}?quantity=${itemQuantity}`,{},{withCredentials:true});
      let productId = element.product._id;
      console.log(productId);
      dispatch(product_Quantity_Updation_Handler({productId, itemQuantity}));
    } catch (error)
    {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      dispatch(userProductsloadingHandler(false));
    }
  }

  //================================HANDLING THE PRODUCT QUANTITY AND CALLING THE API=============
  useEffect(() => {
    let value = itemQuantity;
    if (!value == element.itemQuantity) return;
    updateProductQuantityHandler();
  }, [itemQuantity]);


  //===============================TO  REMOVE THE PRODUCT FROM THE LIST=================
  let removeItem = async () => {
    try {
      dispatch(userProductsloadingHandler(true));

      let respnose = axios.patch(BASE_URL + "/cart/delete-Product/" + element.product._id, {}, { withCredentials: true });
      dispatch(removeItemFromCartHandler(element.product._id));
      toast.success("Product removed From Cart Successfully!");
    }catch(error)
    {
      console.log(error);
      toast.error("Something went wrong!");
      throw new Error(error.message);
    } finally {
      dispatch(userProductsloadingHandler(false));

    }
  };

  //===============================TO UPDATE THE STATUS EITHER SELECTED TO BUY OR NOT==================
  let checkBoxHandler =async () => {
    let value = !element.selectedForPurchase;
    try {
      dispatch(userProductsloadingHandler(true));
      await axios.patch(BASE_URL + `/cart/update-selected-to-purchase/${element.product._id}`,{},{withCredentials:true});
      dispatch(product_Selected_For_Purchase_Handler(element.product._id));
    } catch (error)
    {
      toast.error("Something went wrong!");
    } finally {
      dispatch(userProductsloadingHandler(false));
    }
  };
  if (!element?.product) return;
  let { name, price, images ,_id} = element.product;

  return (
    <>
      {/*=================================For medium or smallar than medium screen */}
      <td  className='md:w-[45%] '>
        <div className='flex '>
        <div >
          {/* --------Check Box */}
          <div>
            <input
              checked={element?.selectedForPurchase}
              onChange={checkBoxHandler}
              className="me-2 cursor-pointer"
                type="checkbox"
                
            />
          </div>
        </div>

        {/* image */}
        <div className=''>
          <div className={`d-flex`}>
            <img
              className={`w-[100px] h-[100px] cursor-pointer`}
              onClick={() =>
                navigate(
                  `/ProductDetails?itemId=${_id}&quantity=${element.quantity}`
                )
              }
              src={images[0]}
              alt={name}
            />
          </div>
        </div>

        <div>
          {/* --------------text details */}
          <div className="font-[500] ms-3  flex flex-col  h-[100px] mb-[20px]">
            {/* -title */}
            <p
              className={` text-[15px] mt-0 md:text-[20px] font-medium`}
              onClick={() =>
                navigate(
                  `/ProductDetails?itemId=${_id}&quantity=${element.quantity}`
                )
              }
            >
              {element.name}
            </p>
            <div className=" flex flex-col h-[100%] justify-between ">
              {/* Quantity */}
              <label htmlFor="" className={`  md:hidden font-medium`}>
                Price:${price}
              </label>

              <div id="quantity" className="flex md:flex-col md:justify-end justify-between h-full  w-[150px]">
                <div
                  className={`flex md:hidden border w-[70px] h-[25px] md:h-[30px]  justify-between items-center font-medium`}
                >
                  <p
                    className="text-[20px] cursor-pointer"
                    onClick={() => {
                      setItemQuantity((ps) => (ps > 1 ? ps - 1 : ps));
                    }}
                  >
                    &#8722;
                  </p>

                  <span className="text-[15px] md:text-[20px] block ">
                    {itemQuantity}
                  </span>

                  <label
                    className="text-[20px]  cursor-pointer"
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
        </div>  
        </div>
        
        
      </td>

      {/* ----------for medium and lower level screens */}
      <td className='hidden md:table-cell'>  <div className=" flex flex-col h-[100%] justify-between ">
              {/* Quantity */}
             

              <div id="quantity" className="flex justify-between w-[150px] ">
                <div
                  className={`border w-[70px] h-[25px] md:h-[30px] flex justify-between items-center font-medium`}
                >
                  <p
                    className="text-[20px] cursor-pointer"
                    onClick={() => {
                      setItemQuantity((ps) => (ps > 1 ? ps - 1 : ps));
                    }}
                  >
                    &#8722;
                  </p>

                  <span className="text-[15px] md:text-[20px] block ">
                    {itemQuantity}
                  </span>

                  <label
                    className="text-[20px]  cursor-pointer"
                    onClick={() => {
                      setItemQuantity((ps) => ps + 1);
                    }}
                  >
                    &#43;
                  </label>
                </div>
               
              </div>
            </div></td>
      <td className='hidden  md:table-cell font-semibold'>{price}</td>
    </>
  );
}

export default CartedSingleItem;
