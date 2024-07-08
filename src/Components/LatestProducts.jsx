// --------------------Internal Imports

import { useParams } from "react-router-dom";

import Styles from "./LatestProducts.module.css";
import { useURLParams } from "../CustomHooks/useURLParams";
import { useEShopData } from "../Contexts/EShopDataProvider";
import ItemCard from "../Reuseable Components/ItemCard";
import Message from "../Reuseable Components/Message";

function LatestProducts({ RelatedProducts }) {

    let { EshopData, isLoading, CategoryStoreData } = useEShopData();

     let {category,id}= useParams();
    
    let DataArray =RelatedProducts?.length? RelatedProducts: category ? CategoryStoreData : EshopData ? EshopData :[];
   
    return (

       <div className={`  m-0 w-100 `}>
        
            <div className={`${Styles.Prodcuts_container_div}`}>
            
            {
                 DataArray?.map((item,index) =>
                (
                    <ItemCard  element={item}  key={index} />
             ))
            }
            </div>

        </div>
    )
}

export default LatestProducts;
