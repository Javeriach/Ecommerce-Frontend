import Style from './DashboardProducts.module.css';
import DashboardProductItem from './DashboardProductItem';
import Spinner from '@/Reuseable Components/Spinner/Spinner';
import { useSelector } from 'react-redux';

function DashboardProducts() {

  
  let { products ,loading} = useSelector(store => store.eshopData);

  return (
  
      <div className={` ${Style.tablewrapper} `}>
      {loading ? <div className='d-flex  justify-content-center h-100  align-items-center w-100'> <Spinner />  </div> :
        products?.length > 0 ?
          <table className={Style.table}>
          <thead>
            <tr className={`${Style.tableHeadsection}`}>
              <th className='text-center'>S.NO</th>

              <th className={` text-center`}>Image</th>

              <th className="text-center">Name</th>

              <th className="text-center">Decription</th>

              <th className={`text-center`}>Price</th>

              <th className={` text-center`}>Category</th>

              <th className={`text-center`}>Action</th>
            </tr>
          </thead>

          <tbody className='w-100 h-100 '>
          { products?.map((item, index) => (
              <DashboardProductItem index={index} key={index} item = {item} />
              ))}
          </tbody>
          </table> : <div className='d-flex h-100 w-100 justify-content-center align-items-center'> 
            <h1 className={Style.noProduct}>No Product Aailable</h1>
        </div>
      }
      </div>
  
  );
}

export default DashboardProducts;
