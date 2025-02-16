import Footer from "@/AppComponents/Footer/Footer";
import SingleProductDetail from "../../Reuseable Components/SinglePageDetail/SingleProductDetail";
import RelatedProducts from "@/AppComponents/RelatedProducts/RelatedProducts";
import axios from "axios";
import { useEffect, useState } from "react";
import { useURLParams } from "@/CustomHooks/useURLParams";
import { BASE_URL } from "@/utils/constants";
function ProductsDetails() {
    let [product, setProductDetails] = useState();
    let [relatedProducts, setRelatedProducts] = useState();
    let [loading, setLoading] = useState(false);
    let { id: itemID } = useURLParams();

    let fetchProductDetail = async (req, res) =>
        {
          try {
            setLoading(true);
            let response = await axios.get(BASE_URL + "/product-detail/" + itemID, { withCredentials: true });
            setRelatedProducts(response.data.relatedProducts)
            setProductDetails(response.data.product);
          } catch (error)
          {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }
      
 useEffect(() => {
          console.log(itemID);
          if (!itemID) return;
          fetchProductDetail();
}, [itemID])
    
    return (
        <div>
            
            <SingleProductDetail loading={loading}  product={product}/>
            <RelatedProducts loading={loading} relatedProducts={relatedProducts} />
            <Footer />
          
        </div>
    )
}

export default ProductsDetails
