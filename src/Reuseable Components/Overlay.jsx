import { useEShopData } from "@/Contexts/EShopDataProvider";
import Style from "./Overlay.module.css";
import Message from "./Message";
function Overlay({ children }) {
    let { shoppingStoreMessage } = useEShopData();
    console.log(shoppingStoreMessage);
    return (

        <section className={Style.Overlay_section} >
            
            {shoppingStoreMessage?.icon && shoppingStoreMessage?.message ? <Message icon={shoppingStoreMessage?.icon} message={shoppingStoreMessage?.message} /> : ""}
            <div className={Style.Overlay}>
            </div>
            
            <div className={Style.OverlayMaterial}>
            {children}
            </div>
        </section>
    )
}

export default Overlay;
