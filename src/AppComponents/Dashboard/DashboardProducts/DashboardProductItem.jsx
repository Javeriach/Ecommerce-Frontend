import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import Edit from '../../../Images/Edit.png';
import Delete from '../../../Images/Delete.png';
import Style from './DashboardProductItem.module.css';
import { useEShopData } from '@/Contexts/EShopDataProvider';

function DashboardProductItem({ item, index }) {
  let [isLoading, setLoading] = useState(false);
  let {
    deleteProductHandler,
    showOverlay,
    setShowOverlay,
    UpdateProductHandler,
  } = useEShopData();

  let deleteHandler = async () => {
    try {
      setLoading(true);
      await deleteProductHandler(item);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  let updatedProduct = () => {
    setShowOverlay('updateProduct');
    UpdateProductHandler('getElement', item);
  };

  return (
    <tr className={`${Style.productColumn}`}>
      <td className="border border-1 text-center">
        <p className='w-[50px]'>{index + 1}</p>
      </td>
      <td className={` border border-1 p-3`}>
        <div className="w-[120px]">
          <img
            src={item.image ? item.image[0] : ''}
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
          {item.category}
        </label>
      </td>

      <td className={`border border-1 `}>
        <div className={`d-flex justify-content-center ${Style.width3}`}>
          <img className="pointer" src={Edit} onClick={updatedProduct} />
          {!isLoading ? (
            <img
              className=" ms-3 pointer"
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
