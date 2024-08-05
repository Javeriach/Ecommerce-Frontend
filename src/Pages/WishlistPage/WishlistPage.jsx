import Footer from '../../AppComponents/Footer/Footer';
import { useCartStorage } from '../../Contexts/ShoppingCart';
import { Link } from 'react-router-dom';

function WishlistPage() {
  let { wishlist, deleteWishItem } = useCartStorage();
  return (
    <div>
      <section className="w-[100%] py-5 flex justify-content-center flex-col p-0 m-0  items-center">
        <h1 className={' text-[30px] md:text-[40px] font-extrabold'}>My WishList🖤</h1>

       
        
       
            {
            wishlist.length > 0 ? (
              <div
              className={`grid md:grid-cols-2 md:gap-8  justify-content-around w-screen p-0 m-0 container  overflow-auto`}
              >
              {wishlist.map((item, index) => (
                  <Link
                  key={index}
                  className="text-decoration-none text-dark mt-3    md:w-[400px]  min-w-[300px]   "
                  to={`/wishlist/ProductDetails?itemId=${item.regularItemId}`}
                >
                  <div className="flex h-[120px]">
                    <div>
                      <img className=" w-[130px] md:w-[150px] h-[120px] " src={item.image} />
                    </div>

                    <div
                      className={` ms-1 flex flex-col justify-between h-[100%] w-[200px]`}
                    >
                      <div>
                        <div className='w-[200px] flex justify-between '>
                          <p className={'text-xl font-semibold block'}>{item.name}</p>
                          <div>
                            <p
                              className={''}
                              onClick={(e) => {
                                e.preventDefault();
                                deleteWishItem(item.id);
                              }}
                            >
                              X
                            </p>
                          </div>
                        </div>

                        <b className={''}>${item.price}</b>
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
