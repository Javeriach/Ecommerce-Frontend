import LatestProducts from "@/AppComponents/ProductsCardContainer/LatestProducts"
import { useURLParams } from "@/CustomHooks/useURLParams";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

function AllResultProducts() {
    let { searchedProductsList,products } = useSelector(store=>store.eshopData);
    let { resultProducts } = useURLParams();
    let navigate = useNavigate();
    
    if (resultProducts != 'lkasdjlfkjflkShopProducts7830klsdjlfkjsdl' || resultProducts != "SearchedProducts") navigate("/");

    return (
        <div>
            <h1 className="text-center text-[35px] m-6 font-medium">{resultProducts == "SearchedProducts" ? 'All Searched Product Results':"Our Latest Products"}</h1>
            {resultProducts =='SearchedProducts'?
                <LatestProducts AllResultProducts={searchedProductsList} />
                :<LatestProducts AllResultProducts={products}/>
            }
        </div>
    )
}

export default AllResultProducts
