// External Imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ----------Accordian
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/Components/ui/accordion';

// Icons
import DescriptionIcon from '@mui/icons-material/Description';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// ---------------------Internal Imports

import { useURLParams } from '../../CustomHooks/useURLParams';
import ProductDetailSkeleton from '@/AppComponents/ProductDetailSkeleton/ProductDetailSkeleton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import toast from 'react-hot-toast';

function SingleProductDetail({product,loading}) {

  let [currentImage, setCurrentImage] = useState('');
  let user  = useSelector(store=>store.user);
  let navigate = useNavigate();
  
  useEffect(() => {
    setCurrentImage(product?.images ? product?.images[0] : '');
  }, [product]);

 
  let addToCartHandler = async (req, res) =>
  {
    try {
      let response = await axios.post(BASE_URL + "/cart/add-product/" + product._id, {}, { withCredentials: true });
      toast.success("Product added to Cart successfully");
    } catch (error)
    {
      console.log(error);
      toast.error("Failed to add product to cart");
    }
  }

  // ============Cart handler
  let CartHandler = (e) => {
    e.preventDefault();
    console.log(user);
    if (!user?._id) {
      navigate('/Login');
      toast.error("Login First!!");
    } else addToCartHandler();
  };



  return (
    <div className={``}>
      {/* Heading */}

      {/* Product Image*/}

      {loading ? (
        <ProductDetailSkeleton />
      ) : !loading && product ? (
        <div className='p-3 md:p-5 flex  flex-col md:flex-row md:gap-6'>
        
          {/* =========Images Section */}
          <div
            className={`w-[auto] mt-2  border-0 rounded  flex flex-col justify-center`}
          >
            <img className={`w-[430px] h-[370px] min-[400px]:w-[390px] min-[400px]:h-[400px]  md:w-[500px]  md:h-[500px]`} src={currentImage} />

            <div className={`flex  w-[auto]  mt-3`}>
              {product?.images?.map((imgItem, index) => (
                <img
                  className={` ${index != 0 ? 'ms-3' : ''} ${
                    currentImage === imgItem
                      ? ' border-2 border-success rounded'
                      : ''
                  } w-[80px] h-[70px]  md:w-[110px] md:h-[100px] bg-cover `}
                  onClick={(e) => setCurrentImage(imgItem)}
                  src={imgItem}
                />
              ))}
            </div>
          </div>

          {/* Products Details */}
          <div className={`w-[100%] md:w-[60%] mt-4 md:mt-0 `}>
            <h3 className={` text-[30px] md:text-[40px] text-center font-medium`} >
              Titel:{product?.name}
            </h3>

              <div>
              <ul className='mt-2 p-2 md:p-0'>
                      <li className="flex  ">
                        {' '}
                        <label className="m-0  text-[17px] md:text-[20px] font-semibold">
                          {' '}
                          <FiberManualRecordIcon sx={{ fontSize: 10 }} /> Price:
                        </label>
                        <span className=" text-[17px] md:text-[20px] ">${product?.price}</span>
                      </li>

                      <li>
                        <label className=" text-[17px] md:text-[20px] font-semibold ">
                          <FiberManualRecordIcon sx={{ fontSize: 10 }} />{' '}
                          Category:
                        </label>
                        <label className=" text-[17px] md:text-[20px] ">{product?.category?.name}</label>
                      </li>

                      <li>
                        <label className=" text-[17px] md:text-[20px] font-semibold ">
                          <FiberManualRecordIcon sx={{ fontSize: 10 }} />{' '}
                          Quantity:
                    </label>
                    

                    <label className=" text-[17px] md:text-[20px] ">1</label>
                    
                      </li>
                </ul>

                
              </div>
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-justify flex justify-between  h-[50px] text-dark">
                      <label className='text-[17px] md:[text-20px] font-semibold '>
                      <DescriptionIcon />
                      Description
                    </label>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-justify text-[17px] p-3 ">{product?.description}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              
            </div>

           
            <button
              className="text-white mt-[20px] bg-dark w-[100%] h-[40px] "
              onClick={CartHandler}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="h-[200px] relative w-screen flex justify-center m-3 ">
          <h5 className=" w-[80%]  text-center text-bold  mt-[30px] ">
            Products Details Fetching Failed...
          </h5>
        </div>
      )}
    </div>
  );
}

export default SingleProductDetail;
