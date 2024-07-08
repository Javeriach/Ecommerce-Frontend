import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Footer from '../Components/Footer';
import Styles from './Cancel.module.css';
import CancelAnimation from "../Lotties/CancelAnimation.json";

function Cancel() {
    return (
      <div>
       
        <div className={`${Styles.payment_section} `}>
  
          <div className={Styles.lottitCancel}>
          <Lottie className={Styles.cancelAnimation} animationData={CancelAnimation}/>
          </div>
         
          <div className='mt-1'>
          <label className={`${Styles.heading} w-100 text-center`}>Payment Unsuccessfull </label>
            <p className={`${Styles.para_text} text-center`} >Unfortunately Your payment has not been completed due to some reason.</p>
          </div>
         
          <Link to={'/'}>
          <button   className={`${Styles.btn}`}>
            Try Again
            </button>
          </Link>
          
        </div>
        <Footer />
      </div>
    );
}

export default Cancel
