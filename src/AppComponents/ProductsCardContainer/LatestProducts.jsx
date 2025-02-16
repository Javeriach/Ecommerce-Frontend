import { useParams } from "react-router-dom";
import Styles from "./LatestProducts.module.css";
import ItemCard from "../../Reuseable Components/ItemCard/ItemCard";
import { useSelector } from "react-redux";

function LatestProducts({categoryProducts,relatedProducts}) {

    let { products,  categories } = useSelector(store=>store.eshopData);
    let {categoryId}= useParams();
    
    let DataArray =relatedProducts?.length ? relatedProducts : categoryId ? categoryProducts: products;
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
