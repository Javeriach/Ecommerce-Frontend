import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarRating from '../Stars/StarRating';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// --------------------Internal
import Styles from './ItemCard.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import { addItemToCartHandler, addItemToWistlistHandler, removeItemFromWishtlistHandler, userProductsloadingHandler } from '@/Redux/Slices/userProducts';
import toast from 'react-hot-toast';

function ItemCard({ element }) {

  let { categoryName, categoryId } = useParams();
  let dispatch = useDispatch(false);
  let navigate = useNavigate();
  let { products } = useSelector(store => store.userProducts.wishedItems);
  let [add_To_Wishtlist, setAddTo_WishList_ForWishlist] = useState(false);
  let user  = useSelector(store => store.user);
  
  useEffect(() => {
    products.forEach((item) => {
    
      if (item.product._id === element._id)
        setAddTo_WishList_ForWishlist(true);
        else  setAddTo_WishList_ForWishlist(false);
    })
    if (products?.length === 0) setAddTo_WishList_ForWishlist(false);
  }, [element,products]);

    //================================================ADD TO CART HANDLER==========================================

  let CartHandler = async (e) =>
  {
    e.preventDefault();
      try {
        dispatch(userProductsloadingHandler(true));
        let response = await axios.post(BASE_URL + "/cart/add-product/" + element._id, {}, { withCredentials: true });
        toast.success(response.data.message);
        if(response.status === 200)
      {  dispatch(addItemToCartHandler(response.data.cart));}
      } catch (error)
      {
        console.log(error);
        toast.error("Failed to add product to cart");
      } finally {
        dispatch(userProductsloadingHandler(false));
      }
    }
  
 
  let { name, _id: id, images, price, rating ,category} = element;

  //================================================WISHLIST==========================================
  let addToWishListHandler = async () =>
  {
    try
    {
      dispatch(userProductsloadingHandler(true));
      let response = await axios.patch(BASE_URL + `/wishlist/add-product/${element._id}`,{},{withCredentials:true});
      toast.success(response.data.message);
      if (response.status === 201)
        dispatch(removeItemFromWishtlistHandler(element._id));
      if(response.status === 200)
      dispatch(addItemToWistlistHandler(response.data.wishlist));
     
    } catch (error)
    {
      console.log(error);
      toast.error("Failed To add product to Wislist");
    } finally {
      dispatch(userProductsloadingHandler(false));
    }
  }

  function wishlistHandler(e) {
    e.preventDefault();
   
    if (!user._id) {
      navigate('/Login');
    }
    else
      addToWishListHandler();
  }

  return (
    <Link
      to={
        categoryId
          ? `/Categories/${categoryName}/${categoryId}/Product?itemId=${id}`
          : `/latestProducts?itemId=${id}`
      }
      className={` w-[150px] h-[200px] md:w-[300px] md:h-[400px] ${Styles.card} card text-decoration-none`}
    >
      <div className={`${Styles.card_data}`}>
        <div className="d-flex bg-white justify-content-center p-0 card-img-top ">
          <img
            src={images[0]}
            className={`w-[150px] h-[150px] md:w-[300px]  md:h-[300px]  ${Styles.card_image}`}
            alt="..."
          />
          <div className="flex justify-end">
          
            {!add_To_Wishtlist ? (
              
              <div className=' flex justify-center items-center absolute rounded-full bg-red-500 w-[40px] h-[40px]'>
              <FontAwesomeIcon
                icon={faHeart}
                className={` text-[30px]`}
                onClick={wishlistHandler}
              /></div>
            ) : (
              <div className=' flex justify-center items-center absolute rounded-full bg-red-500 w-[40px] h-[40px]'>
                  <FavoriteIcon sx={ {fontSize: 30 , color:"white"}}
                    onClick={wishlistHandler}
                  />
              </div>
            )}
          </div>
        </div>

        <div className={`p-[4px]  `}>
          <p className={`text-[14px]  w-[142px] md:w-[auto] truncate  md:text-[20px] font-medium `}>{name}</p>

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
