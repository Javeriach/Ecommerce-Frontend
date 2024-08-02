import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Footer from '@/AppComponents/Footer/Footer';
import Styles from './Cancel.module.css';
import CancelAnimation from '../../Lotties/CancelAnimation.json';

function Cancel() {
  return (
    <div >
      <div className={` h-[400px]`}>
        <div className={`w-screen flex justify-center items-center mt-[40px]`}>
          <Lottie
            className={`h-[150px] w-[200px]`}
            animationData={CancelAnimation}
          />
        </div>

        <div className="mt-1 flex flex-col justify-center items-center">
          <label className={` w-screen text-[30px] font-[600] text-center`}>
            Payment Unsuccessfull{' '}
          </label>
          <p className={`${Styles.para_text} text-center w-[90%]`}>
            Unfortunately Your payment has not been completed due to some
            reason.
          </p>
        </div>

        <Link to={'/'} className='w-screen flex items-center justify-center'>
          <button
            className={`relative text-[20px] p-2
  font-[500] bg-red-600  text-whiteborder-0 rounded-[3px] text-white`}
          >
            Try Again
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Cancel;
