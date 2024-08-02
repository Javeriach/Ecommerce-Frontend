// --------------------Internal Imports

import { useParams } from "react-router-dom";

import Styles from "./LatestProducts.module.css";
import { useEShopData } from "../../Contexts/EShopDataProvider";
import ItemCard from "../../Reuseable Components/ItemCard/ItemCard";

function LatestProducts({ RelatedProducts, AllResultProducts }) {

    let { EshopData,  CategoryStoreData } = useEShopData();

     let {category}= useParams();
    
    let DataArray =RelatedProducts?.length? RelatedProducts: category ? CategoryStoreData : AllResultProducts? AllResultProducts: EshopData ? EshopData.slice(0,10) :[];
   
    return (

       <div className={` m-0 w-100 `}>
        
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
