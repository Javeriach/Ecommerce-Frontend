import Footer from '../Components/Footer';
import Styles from './Wishlist.module.css';
import { useCartStorage } from '../Contexts/ShoppingCart';
import { Link } from 'react-router-dom';

function WishlistPage() {
  let { wishlist, deleteWishItem } = useCartStorage();
  return (
    <div>
    

      <section className="w-100 py-5 d-flex justify-content-center flex-column  align-items-center">
        <h1 className={Styles.heading}>My WishList🖤</h1>

        <div
          className={`grid md:grid-cols-2 content-center w-screen container`}
        >
          {wishlist.length > 0 ? (
            wishlist.map((item, index) => (
              <Link
                key={index}
                className="text-decoration-none text-dark"
                to={`/wishlist/ProductDetails?itemId=${item.regularItemId}`}
              >
                <div className={`d-flex  justify-content-between  mt-2 col-4`}>
                  <div className={Styles.card}>
                    <div>
                      <img className="w-[250px] h-[150px] " src={item.image} />
                    </div>

                    <div
                      className={`${Styles.details_section} ms-1 d-flex flex-column justify-content-between`}
                    >
                      <div>
                        <p className={Styles.title}>{item.name}</p>
                        <b className={Styles.price}>${item.price}</b>
                      </div>

                      <button
                        className={`btn border border-secondary ${Styles.btn}`}
                      >
                        See More
                      </button>
                    </div>
                    <div>
                      <p
                        className={Styles.deleteBtn}
                        onClick={(e) => {
                          e.preventDefault();
                          deleteWishItem(item.id);
                        }}
                      >
                        X
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>
              {' '}
              <label className={'w-screen text-[30px]'}>
                No wishlist item available
              </label>{' '}
            </div>
          )}
        </div>
      </section>

      <div></div>
      <Footer></Footer>
    </div>
  );
}

export default WishlistPage;
