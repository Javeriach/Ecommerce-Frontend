import Style from "./Overlay.module.css";
function Overlay({ children }) {
   
    return (

        <section className={Style.Overlay_section} >
            
            <div className={Style.Overlay}>
            </div>
            
            <div className={Style.OverlayMaterial}>
            {children}
            </div>
        </section>
    )
}

export default Overlay;
