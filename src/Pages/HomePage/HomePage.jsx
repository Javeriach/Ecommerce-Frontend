import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Categories from '../../AppComponents/CategoriesComponent/Categories';
import LandingPage from '../../AppComponents/LandingPageComponent/LandingPage';
import Footer from '../../AppComponents/Footer/Footer';
import LatestProducts from '../../AppComponents/ProductsCardContainer/LatestProducts';
import ItemCardSkeleton from '@/AppComponents/ItemCardSkeleton/ItemCardSkeleton';
import { useEShopData } from '@/Contexts/EShopDataProvider';
function HomePage() {
  let { isLoading, EshopData,categories } = useEShopData();
  console.log(EshopData);
  return (
    <div className={``}>
      
      <LandingPage />

      <div className='w-[100%]'>
      <div  className='px-4 md:[0px]'>
        <h4 className={` mt-8 md:ml-[30px] text-[30px]  md:text-[35px] font-[600]  mb-2`}>Categories</h4>

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
     
      
      <div className='flex flex-col justify-center items-center'>
        <div  className='md:[0px] px-[7%] md:p-0 flex  flex-between  justify-between items-center w-screen md:w-[96%]'>
          <h4 className={` mt-8 md:ml-[30px] text-[25px]  md:text-[35px] font-[600]  mb-8`}>Products</h4>
          <Link
            to={
              '/AllResults?resultProducts=lkasdjlfkjflkShopProducts7830klsdjlfkjsdl'
            }
          >
            <button className="btn bg-dark text-light mt-1 text-[15px] rounded-0">View All <ArrowRightAltIcon /></button>
          </Link>
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
