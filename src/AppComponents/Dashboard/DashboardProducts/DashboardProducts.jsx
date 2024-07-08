import Style from './DashboardProducts.module.css';

import { useEShopData } from '@/Contexts/EShopDataProvider';
import DashboardProductItem from './DashboardProductItem';
import Spinner from '@/Reuseable Components/Spinner/Spinner';

function DashboardProducts() {
  let { EshopData, isLoading ,UpdateProductHandler,elementToUpdate} = useEShopData();
  
  

  return (
  
      <div className={` ${Style.tablewrapper} `}>
      {isLoading ? <div className='d-flex  justify-content-center h-100  align-items-center w-100'> <Spinner />  </div> :
        EshopData.length > 0 ?
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
          { EshopData?.map((item, index) => (
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
