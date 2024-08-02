import { Link } from 'react-router-dom';
import Overlay from '../../Reuseable Components/Overlay/Overlay';
import Styles from './LandingPage.module.css';
import HomePage from '../../Images/HomePage.png';
import Aos from 'aos';
import { useEffect } from 'react';


function LandingPage() {
  useEffect(() =>
  {
    Aos.init({ duration: 1000 });
  }, [])
  
  return (
    <div
      className={`${Styles.landingPage} mb-10 md:h-auto grid grid-cols-2 items-center content-between md:gap-[100px]`}
    >
      {/* text */}
      <div className={`${Styles.text_Area} ${Styles.robotFont} mb-4`}>
        <div  data-aos="fade-down" className={`${Styles.text_Area_CoreSection} font-[500]`}>
          <p className="mb-0">50% Off Winter Super Sale</p>

          <label htmlFor="" className="text-[30px] md:text-[60px]">
            <span className="text-white font-medium border text-[60px] max-[894]:text-[120px] lg:text-[120px] drop-shadow-md">
              New <br/> Collection
            </span>{' '}
          </label>
        <h5 className='text-[20px]'>Look Best on your Best Day</h5>
          <Link
            to={
              '/AllResults?resultProducts=lkasdjlfkjflkShopProducts7830klsdjlfkjsdl'
            }
          >
            <button className="btn bg-dark text-light mt-1">Shop Now &rarr;</button>
          </Link>
        </div>
      </div>

      {/* image */}

      <div className={` ${Styles.image_section} mr-3 flex justify-content-end`}>
        <img
          data-aos="fade-down"
          className="items-center bg-center   h-full md:h-[60%] "
          src={HomePage}
        />
      </div>
    </div>
  );
}

export default LandingPage;
