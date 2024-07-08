import Categories from '../Components/Categories';
import LandingPage from '../Components/LandingPage';
import Footer from '../Components/Footer';
import LatestProducts from '../Components/LatestProducts';
import Styles from './HomePage.module.css';
import ItemCardSkeleton from '@/AppComponents/ItemCardSkeleton/ItemCardSkeleton';
import { useEShopData } from '@/Contexts/EShopDataProvider';
function HomePage() {
  let { isLoading, EshopData,categories } = useEShopData();
  console.log(EshopData);
  return (
    <div className={`h-[900px]`}>
      
      <LandingPage />

      <div className='w-[100%]'>
      <div  className='px-4 md:[0px]'>
        <h4 className={`${Styles.Latest_product} mt-8 md:ml-[30px] text-[30px]  md:text-[35px] font-[600]  mb-2`}>Categories</h4>

        </div>
        {!isLoading && !categories?.length ? (
        <div className="h-[200px] relative w-screen flex justify-center m-3 ">
        <p className=" w-[80%] ml-[60px] text-center text-bold  mt-[30px] ">
          Categories  Fetching Failed...
        </p>
      </div>
      ) : (
        <Categories />
      )}
      </div>
     

      <div>
        <div  className='px-4 md:[0px]'>
        <h4 className={`${Styles.Latest_product} mt-8 md:ml-[30px] text-[30px]  md:text-[35px] font-[600]  mb-8`}>Latest Products</h4>

        </div>
        {isLoading ? (
          <ItemCardSkeleton tempString={'tempStri'} />
        ) : !isLoading && !EshopData?.length ? (
          <div className="h-[200px] relative w-screen flex justify-center ">
            <p className=" w-[80%] ml-[60px] text-center text-bold  mt-[30px] ">
              Products Fetching Failed...
            </p>
          </div>
        ) : (
          <LatestProducts />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
