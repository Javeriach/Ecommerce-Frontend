import LatestProducts from "@/AppComponents/ProductsCardContainer/LatestProducts"
import { useEShopData } from "@/Contexts/EShopDataProvider";
import { useURLParams } from "@/CustomHooks/useURLParams";
import { useNavigate, useParams } from "react-router-dom"

function AllResultProducts() {
    let { SearchedProducts } = useEShopData();
    let { resultProducts } = useURLParams();
    let { EshopData } = useEShopData();
    let navigate = useNavigate();
    
    if (resultProducts != 'lkasdjlfkjflkShopProducts7830klsdjlfkjsdl' || resultProducts != "SearchedProducts") navigate("/");

    return (
        <div>
            <h1 className="text-center text-[35px] m-6 font-medium">{resultProducts == "SearchedProducts" ? 'All Searched Product Results':"Our Latest Products"}</h1>
            {resultProducts =='SearchedProducts'?
                <LatestProducts AllResultProducts={SearchedProducts} />
                :<LatestProducts AllResultProducts={EshopData}/>
            }
        </div>
    )
}

export default AllResultProducts
