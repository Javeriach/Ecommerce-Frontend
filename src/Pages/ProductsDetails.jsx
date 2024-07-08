import Styles from "./ProductsDetails.module.css";
import Footer from "../Components/Footer";
import SingleProductDetail from "../Reuseable Components/SingleProductDetail";
import RelatedProducts from "@/AppComponents/RelatedProducts/RelatedProducts";
function ProductsDetails() {
    
    return (
        <div>
          
            
            <SingleProductDetail />
            <RelatedProducts/>
            <Footer />
          
        </div>
    )
}

export default ProductsDetails
