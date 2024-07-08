import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarRating from '../Reuseable Components/Stars/StarRating';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// --------------------Internal
import Styles from './ItemCard.module.css';
import { useCartStorage } from '../Contexts/ShoppingCart';
import { useEffect, useState } from 'react';
import { useAuthenticator } from '../Contexts/Authenticator';

function ItemCard({ element }) {
  let { category } = useParams();
  let { addToCartHandler, addTOWishlist, isLoading, wishlist } =
    useCartStorage();
  let [wishedItem, setWishedItem] = useState(false);
  useEffect(() => {
    let result = wishlist?.filter((item) => item.regularItemId === element.id);
    if (result?.length > 0) {
      setWishedItem(true);
    }
  }, [wishlist]);

  let { currentUserDetails } = useAuthenticator();

  let { name, id: itemId, image, price, rating } = element;

  if (!element) return;

  let navigate = useNavigate();

  let CartHandler = (e) => {
    e.preventDefault();

    if (!currentUserDetails.id) {
      navigate('/Login');
    } else addToCartHandler(element);
  };

  // Wishlist
  function wishlistHandler(e) {
    e.preventDefault();
    if (!currentUserDetails.id) {
      navigate('/Login');
    } else addTOWishlist(itemId, name, price, image[0]);
  }

  return (
    <Link
      to={
        category
          ? `/Categories/${category}/Products?itemId=${itemId}`
          : `/latestProducts?itemId=${itemId}`
      }
      className={` w-[150px] h-[150px] md:w-[300px] md:h-[400px] ${Styles.card} card text-decoration-none`}
    >
      <div className={`${Styles.card_data}`}>
        <div className="d-flex bg-white justify-content-center p-0 card-img-top ">
          <img
            src={image[0]}
            className={`w-[150px] h-[150px] md:w-[300px]  md:h-[300px]  ${Styles.card_image}`}
            alt="..."
          />
          <div className="flex justify-end">
            {!wishedItem ? (
              <FontAwesomeIcon
                icon={faHeart}
                onClick={wishlistHandler}
                className={`absolute ${Styles.heart}  text-[30px]`}
              />
            ) : (
              <div
                className={`absolute ${Styles.heart} `}
                onClick={wishlistHandler}
              >
                {' '}
                <FavoriteIcon sx={{ fontSize: 35 }} />
              </div>
            )}
          </div>
        </div>

        <div className={`p-[4px]  `}>
          <p className={`text-[14px] md:text-[20px] font-medium`}>{name}</p>

          {/* ---------------Star Rating */}
          
          <div className='md:hidden'>
          <StarRating
            size="14px"
            starNo={5}
            defaultRating={Number(rating)}
            color="Black"
            
          />
          </div>
        
           
          <div>
            <div className='hidden md:block'>
            <StarRating
            size="20px"
            starNo={5}
            defaultRating={Number(rating)}
            color="Black"
          />
            </div>
            
      </div>
         

{/* =-------------text area */}
          <div className='flex justify-between '>
            <p className={`card-text text-[14px] md:text-[20px] font-medium`}>
              <span>Prics:</span> <span>${price}</span>
            </p>

           
          <div className='md:hidden'>
            <AddShoppingCartOutlinedIcon
                onClick={CartHandler}
                sx={{ fontSize: 20 }}
              />
          </div>
        
           
      
            <div className='hidden md:block'>
            <AddShoppingCartOutlinedIcon
                onClick={CartHandler}
                sx={{ fontSize: 30 }}
              />
        
          </div>

        
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
