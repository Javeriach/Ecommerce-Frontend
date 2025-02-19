import Footer from '../../AppComponents/Footer/Footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeItemFromWishtlistHandler, userProductsloadingHandler } from '@/Redux/Slices/userProducts';
import toast from 'react-hot-toast';
import { BASE_URL } from '@/utils/constants';

function WishlistPage() {
  let { products} = useSelector(store=>store.userProducts.wishedItems);
  let dispatch = useDispatch();

  let removeFromWishListHandler = async (_id) =>
  {
      try
      {
        dispatch(userProductsloadingHandler(true));
        let response = await axios.patch(BASE_URL + `/wishlist/delete-Product/${_id}`,{},{withCredentials:true});
        toast.success(response.data.message);
        dispatch(removeItemFromWishtlistHandler(_id));
      } catch (error)
      {
        console.log(error);
        toast.error("Something went wrong!");
      } finally {
        dispatch(userProductsloadingHandler(false));
      }
    }

 
  return (
    <div>
      <section className="w-[100%] py-5 flex justify-content-center flex-col p-0 m-0  items-center">
        <h1 className={' text-[30px] md:text-[40px] font-extrabold'}>My WishList🖤</h1>

       
        
       
            {
            products.length > 0 ? (
              <div
              className={`grid md:grid-cols-2 md:gap-8  justify-content-around w-screen p-0 m-0 container  overflow-auto`}
              >
              {products?.map((item, index) => (
                  <Link
                  key={index}
                  className="text-decoration-none text-dark mt-3    md:w-[400px]  min-w-[300px]   "
                  to={`/wishlist/ProductDetails?itemId=${item.product._id}`}
                >
                  <div className="flex h-[120px]">
                    <div>
                      <img className=" w-[130px] md:w-[150px] h-[120px] " src={item.product.images[0]} />
                    </div>

                    <div
                      className={` ms-1 flex flex-col justify-between h-[100%] w-[200px]`}
                    >
                      <div>
                        <div className='w-[200px] flex justify-between '>
                          <p className={'text-xl font-semibold block'}>{item.product.name}</p>
                          <div>
                            <p
                              className="font-bold ms-3"
                              onClick={(e) => {
                                e.preventDefault();
                                removeFromWishListHandler(item?.product._id);
                              }}
                              
                            >
                              X
                            </p>
                          </div>
                        </div>

                        <b className={''}>${item.product.price}</b>
                      </div>

                      <button
                        className={`w-[100px] bg-black text-white h-[40px]`}
                      >
                        See More
                      </button>
                    </div>
                  </div>
                </Link>
               ))}
               </div>) : (
              <div className=' h-[400px] flex justify-center items-center  w-screen'>
              <label className={'w-screen  text-center'}>
                No wishlist item available
              </label>{' '}
            </div>
          )}
       
      

     </section>
      <Footer></Footer>
    </div>
  );
}

export default WishlistPage;
