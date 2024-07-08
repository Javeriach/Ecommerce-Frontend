import { Link } from "react-router-dom";
import Overlay from "../Reuseable Components/Overlay";
import Styles from "./LandingPage.module.css";
import HomePage  from "../Images/HomePage.png";
function LandingPage() {
    return (
        <div className={`${Styles.landingPage} grid grid-cols-2 items-center content-between md:gap-[100px]`}>
            {/* text */}
            <div className={`${Styles.text_Area} ${Styles.robotFont}`}>
          
                <div className={`${Styles.text_Area_CoreSection} font-[500]`}>
                    <p className="mb-0">50% Off Winter Super Sale</p>
                   
                    <label htmlFor="" className="text-[30px] md:text-[60px]">Unleash your Style with Our   <br/> NewCollection</label><br/>
                    <Link to={'/Shop'}><button className="btn bg-dark text-light">Shop Now &rarr;</button></Link>
            
           

                </div>
            </div>

               {/* image */}

            <div className={` ${Styles.image_section} mr-3 flex justify-content-end`} >
                <img className={Styles.manImage} src={HomePage} />
            </div>

           


        </div>
    )
}

export default LandingPage
