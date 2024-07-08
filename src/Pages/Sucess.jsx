import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { loadStripe } from '@stripe/stripe-js';

import Footer from '../Components/Footer';
import Styles from './Sucess.module.css';
import SuccessAnimation from "../Lotties/SuccessAnimation.json";
import { useEffect } from 'react';
import { useCartStorage } from '@/Contexts/ShoppingCart';
import { useURLParams } from '@/CustomHooks/useURLParams';
import { useAuthenticator } from '@/Contexts/Authenticator';

function Sucess() {
 
  let { maintainUserSession,currentUserDetails} = useAuthenticator();
  let { ordersHandler } = useCartStorage();
  let { session_id } = useURLParams();
  
  useEffect(() => {

    
    if(!currentUserDetails?.name)
      maintainUserSession();
    if(currentUserDetails?.name)
    ordersHandler(session_id , currentUserDetails);
    console.log(currentUserDetails);
    
  }, [currentUserDetails]);

  return (
    <div>
      <div className={`${Styles.payment_section} `}>

        <div className='w-100 d-flex justify-content-center mt-5'>
        <Lottie className={Styles.successAnimation} animationData={SuccessAnimation}/>
        </div>

        <div className='mt-1'>
        <label className={`${Styles.heading} w-100 text-center`}>Payment Successfully Done</label>
          <p className={`${Styles.para_text} text-center`} >Thank you for your payment.Your Order will be delivered Soon</p>
        </div>
       
        <div className='d-flex w-100 justify-content-center'>
        <Link to={'/'}>
        <button   className={`${Styles.btn}`}>
          Continue to Shopping
          </button>
        </Link>
        </div>
       
        
      </div>
      <Footer />
    </div>
  );
}

export default Sucess;
