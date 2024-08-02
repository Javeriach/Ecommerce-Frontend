import Footer from "@/AppComponents/Footer/Footer";
import SingleProductDetail from "../../Reuseable Components/SinglePageDetail/SingleProductDetail";
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
