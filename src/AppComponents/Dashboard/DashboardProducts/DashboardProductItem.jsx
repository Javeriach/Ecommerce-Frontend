import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Edit from '../../../Images/Edit.png';
import Delete from '../../../Images/Delete.png';
import Style from './DashboardProductItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import toast from 'react-hot-toast';
import { product_To_UpdateHandler, removeProductHandler } from '@/Redux/Slices/eshopSlice';
import { setShowOverlay } from '@/Redux/Slices/handlersSlice';

function DashboardProductItem({ item, index }) {
  let [isLoading, setLoading] = useState(false);
  let {
    showOverlay,
  } = useSelector(store=>store.eshopData);
  let dispatch = useDispatch();

  let deleteHandler = async () =>
  {
    try {
      setLoading(true);
      await axios.post(BASE_URL + "/delete-product/"+ item?._id,{}, { withCredentials:true });
      dispatch(removeProductHandler(item._id));
      toast.success("Product deleted Successfully!");
    } catch (error)
    {
      console.log("Something wen wrong!");
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

 

  let updatedProduct = () => {
    dispatch(setShowOverlay("updateProduct"));
    dispatch(product_To_UpdateHandler(item));
  };

  return (
    <tr className={`${Style.productColumn}`}>
      <td className="border border-1 text-center">
        <p className='w-[50px]'>{index + 1}</p>
      </td>
      <td className={` border border-1 p-3`}>
        <div className="w-[120px]">
          <img
            src={item.images ? item.images[0] : ''}
            className={` ${Style.image}`}
            alt="item-image"
          />
        </div>
      </td>
      <td className={`border border-1`}>
        <label htmlFor="" className={`${Style.width2}`}>
          {item.name}
        </label>
      </td>

      <td className={`text-center border border-1 `}>
        <label
          htmlFor=""
          className={`${Style.description} text-justify ${Style.width1}`}
        >
          {item.description}
        </label>
      </td>

      <td className={`border border-1`}>
        <label className={`${Style.width3}`}>{item.price}</label>
      </td>

      <td className={`border border-1  `}>
        <label htmlFor="" className={`${Style.width2}`}>
          {item.category.name}
        </label>
      </td>

      <td className={`border border-1 `}>
        <div className={`d-flex justify-content-center ${Style.width3}`}>
          <img className="pointer cursor-pointer" src={Edit} onClick={updatedProduct} />
          {!isLoading ? (
            <img
              className=" ms-3 pointer cursor-pointer"
              src={Delete}
              onClick={() => deleteHandler(item)}
            />
          ) : (
            <div className="ms-2">
              {' '}
              <Spinner />{' '}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default DashboardProductItem;
