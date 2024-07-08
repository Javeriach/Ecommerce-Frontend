// External Imports
import { useEffect, useState } from 'react';

// ----------Accordian
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/Components/ui/accordion';

// Icons
import DescriptionIcon from '@mui/icons-material/Description';
import DetailsIcon from '@mui/icons-material/Details';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// ---------------------Internal Imports
import Styles from './SingleProductDetail.module.css';
import { useURLParams } from '../CustomHooks/useURLParams';
import { useEShopData } from '../Contexts/EShopDataProvider';
import { useParams } from 'react-router-dom';
import ProductDetailSkeleton from '@/AppComponents/ProductDetailSkeleton/ProductDetailSkeleton';
import { useCartStorage } from '@/Contexts/ShoppingCart';

function SingleProductDetail() {
  let { id: itemID, quantity } = useURLParams();
  let [currentImage, setCurrentImage] = useState('');
  let size = ['XS', 'S', 'M', 'L', 'XL', 'XL'];

  let { EshopData, currentProduct, getProductDetail, isLoading } =
    useEShopData();

  useEffect(() => {
    getProductDetail(itemID);
  }, [itemID]);

  let { image, name, description, price, category } = currentProduct;

  let { addToCartHandler } = useCartStorage();
  useEffect(() => {
    setCurrentImage(currentProduct?.image ? currentProduct.image[0] : '');
  }, [currentProduct]);

  return (
    <div className={`row ${Styles.ProductDetails} `}>
      {/* Heading */}

      {/* Product Image*/}

      {isLoading ? (
        <ProductDetailSkeleton />
      ) : !isLoading && name ? (
        <>
          <label className={` text-[40px] font-[600] mb-2 mt-3`}>
            Product Details:{' '}
          </label>
          {/* =========Images Section */}
          <div
            className={`w-[400px] mt-5 col-5  border border-0 rounded  d-flex flex-column justify-content-center`}
          >
            <img className={Styles.lgImage} src={currentImage} />

            <div className={`d-flex  ${Styles.smImagesSection}`}>
              {image?.map((imgItem, index) => (
                <img
                  className={` ${index != 0 ? 'ms-3' : ''} ${
                    currentImage === imgItem
                      ? 'border  border-2 border-success rounded'
                      : ''
                  } ${Styles.smImage}`}
                  onClick={(e) => setCurrentImage(imgItem)}
                  src={imgItem}
                />
              ))}
            </div>
          </div>

          {/* Products Details */}
          <div className={`w-[90%] mt-5 p-2 `}>
            <h3>
              <span className={`font-[500] text-[40px]`}>Titel:{name}</span>
            </h3>

            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-justify flex justify-between  h-[50px] text-dark">
                    <div>
                      <DescriptionIcon />
                      Description
                    </div>
                  </AccordionTrigger>
                    <AccordionContent><p className='text-justify'>{description}</p></AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-justify flex justify-between h-[50px] mt-2">
                    <div>
                      <DetailsIcon />
                      Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      <li className="flex">
                        {' '}
                        <label className="m-0 text-[15px] font-semibold">
                          {' '}
                          <FiberManualRecordIcon sx={{ fontSize: 10 }} /> Price:
                        </label>
                        <span className="text-[15px] ">${price}</span>
                      </li>

                      <li>
                        <label className="text-[15px] font-semibold ">
                          <FiberManualRecordIcon sx={{ fontSize: 10 }} />{' '}
                          Category:
                        </label>
                        <label className="text-[15px] ">{category}</label>
                      </li>

                      <li>
                        <label className="text-[15px] font-semibold ">
                          <FiberManualRecordIcon sx={{ fontSize: 10 }} />{' '}
                          Quantity:
                        </label>
                        <label className="text-[15px] ">1</label>
                      </li>
                    </ul>
                      
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* <div>
              <h5 className={`${Styles.CastelogFont} mt-2`}>
                <span className={`${Styles.price}`}>Color:</span>
                <span className={`${Styles.priceNumber}`}>Black</span>
              </h5>
            </div> */}

            {/* <div className="w-[400px] flex flex-wrap">
              {size?.map((item) => (
                <button className="border border-dark ml-2 border-[2px] w-[100px] mt-2 h-[40px] text-dark">
                  {item}
                </button>
              ))}
            </div> */}
            <button
              className="text-white mt-[20px] bg-dark w-[100%] h-[40px] "
              onClick={() => {
                addToCartHandler(currentProduct);
              }}
            >
              Add To Cart
            </button>
          </div>
        </>
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
