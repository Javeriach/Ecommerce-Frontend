import { useURLParams } from '@/CustomHooks/useURLParams';
import { useEShopData } from '@/Contexts/EShopDataProvider';
import { useEffect, useState } from 'react';
import LatestProducts from '@/AppComponents/ProductsCardContainer/LatestProducts';
import ItemCardSkeleton from '../ItemCardSkeleton/ItemCardSkeleton';

function RelatedProducts() {
  let { currentProduct, isLoading, CategoryStoreData, getCategoryData } =
    useEShopData();
  let { id: itemId } = useURLParams();
  let [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchRelatedProducts() {
      await getCategoryData(currentProduct.category);
    }
    if (currentProduct?.category) fetchRelatedProducts();
  }, [itemId, currentProduct]);

  useEffect(() => {
    let data = CategoryStoreData?.filter((item) => {
      console.log(itemId !== item.id);
      return item.id != itemId;
    });
    setFilteredData(data);
    console.log('hello second');
  }, [itemId, CategoryStoreData]);

  return (
    <div className="h-auto w-screen">
      {isLoading ? (
        <>
          <label
            className={` w-[100%]  mt-6 text-4xl text-center`}
          >
            Related Products
          </label>
          <ItemCardSkeleton tempString={'temp'} />
        </>
      ) : !isLoading && filteredData.length ? (
        <>
          <label
            className={` w-[100%]  mt-6 text-4xl text-center`}
          >
            Related Products
          </label>
          <LatestProducts RelatedProducts={filteredData} />
        </>
      ) : (
        <div className="h-[200px] relative w-screen flex justify-center m-3 ">
          <p className=" w-[80%]  text-center text-bold  mt-[30px] ">
            Related Products Fetching Failed...
          </p>
        </div>
      )}
    </div>
  );
}

export default RelatedProducts;
