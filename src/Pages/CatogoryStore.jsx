import { Outlet, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import LatestProducts from "../Components/LatestProducts";
import { useEffect } from "react";
import { useEShopData } from "../Contexts/EShopDataProvider";
import SpinnerFullPage from "../Reuseable Components/Spinner/SpinnerFullPage";
import Styles from "./CategoryStore.module.css";


function ProductListing() {
    let { category } = useParams();
    console.log(category);
    let {  getCategoryData, isLoading } = useEShopData();

    useEffect(() =>
    {
        if (!category) return;
        getCategoryData(category);

        
    }, [category])

    return (

        <div>
           
            {isLoading ? <SpinnerFullPage /> :
                <div>
                    <h4 className={`${Styles.Category_heading} mt-4`}>{category}</h4>
                    <LatestProducts />
                </div>
            }           
            <Footer />
            <Outlet/>
        </div>
    )
}

export default ProductListing;
