import * as React from "react";
import Carousel from "react-multi-carousel";
import Styles from "./TextBannerCarosel.module.css";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

function TextBannerCarousel() {
    let textArray = ['Normal Order Delivery will take 4-5 Days',
        '$5 Delivery Charges for order below $30',
    ]
    
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 0 },
          items: 1,
        }
    };

    useEffect(() => {
        AOS.init({ duration: 200 });
    }, []);

  return <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
      transitionDuration={500}
      className={`${Styles.carousel} h-[40px] mt-[30px] bg-[black] text-light`}
       
      >
          {textArray.map((text , index) =>
          (
              <div key={index} >
                  <p className=" w-screen text-center">{text}</p>
             </div>
          )
          )}
      </Carousel>
  
   
  
}

export default TextBannerCarousel;
