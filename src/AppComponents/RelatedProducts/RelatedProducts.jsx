import LatestProducts from '@/AppComponents/ProductsCardContainer/LatestProducts';
import ItemCardSkeleton from '../ItemCardSkeleton/ItemCardSkeleton';

function RelatedProducts({loading,relatedProducts}) {
  

  return (
    <div className="h-auto w-screen">
      {loading? (
        <>
          <label
            className={` w-[100%]  mt-6 text-4xl text-center`}
          >
            Related Products
          </label>
          <ItemCardSkeleton tempString={'temp'} />
        </>
      ) :relatedProducts?.length ? (
        <>
          <label
            className={` w-[100%]  mt-6 text-4xl text-center`}
          >
            Related Products
          </label>
          <LatestProducts relatedProducts={relatedProducts} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default RelatedProducts;
