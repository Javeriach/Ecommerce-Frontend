import { Outlet, useParams } from "react-router-dom";
import Footer from "@/AppComponents/Footer/Footer";
import LatestProducts from "@/AppComponents/ProductsCardContainer/LatestProducts";
import { useEffect, useState } from "react";
import SpinnerFullPage from "../../Reuseable Components/Spinner/SpinnerFullPage";
import Styles from "./CategoryStore.module.css";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";


function ProductListing() {
    let {categoryName,categoryId } = useParams();
    let [loading, setLoading] = useState(false);
    let [categoryProducts, setCategoryProducts ] = useState([]);    
    let getCategoryProducts = async (req, res) =>
    {
        setLoading(true);
        try {
            let products = await axios.get(BASE_URL + "/category-products/" + categoryId, {
                withCredentials:true
            });
            console.log(products.data);
            setCategoryProducts(products.data.products);
        } catch (error)
        {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        if (!categoryId) return;
        getCategoryProducts();
        
    }, [categoryId])

    return (

        <div>
           
            {loading ? <SpinnerFullPage /> :
                <div className="flex flex-col justify-center items-center">
                    <label className={`text-center font-bold text-[30px] mt-4 mb-2`}>{categoryName}</label>
                    {categoryProducts?.length === 0 ? <div className="h-[400px] flex items-center"> 
                        <label className="text-center">No Products Available</label>
                   </div> : <LatestProducts categoryProducts={categoryProducts} />}
                </div>
            }           
            <Footer />
            <Outlet/>
        </div>
    )
}

export default ProductListing;
