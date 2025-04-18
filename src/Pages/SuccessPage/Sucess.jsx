import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Styles from './Sucess.module.css';
import SuccessAnimation from "../../Lotties/SuccessAnimation.json";
import { useEffect } from 'react';


function Sucess() {
 
  return (
    <div>
      <div className={`${Styles.payment_section} `}>

        <div className='w-100 d-flex justify-content-center '>
        <Lottie className={` h-[200px] w-[150px] md:h-[240px] md:w-[200px]`} animationData={SuccessAnimation}/>
        </div>

        <div className='mt-1 flex flex-col justify-center items-center'>
        <label className={`text-[25px] md:text-[30px] w-100 text-center font-[600]`}>Payment Successfully Done</label>
          <p className={`text-[20px] text-center w-[90%]`} >Thank you for your payment.Your Order will be delivered Soon</p>
        </div>
       
        <div className='d-flex w-100 justify-content-center'>
        <Link to={'/'}>
        <button   className={`${Styles.btn}`}>
          Continue to Shopping
          </button>
        </Link>
        </div>
       
        
      </div>
    </div>
  );
}

export default Sucess;
