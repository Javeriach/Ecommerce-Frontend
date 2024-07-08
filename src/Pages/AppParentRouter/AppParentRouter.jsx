import { Outlet } from 'react-router-dom';

import NavbarShowCase from '@/AppComponents/NavbarShowCase/Navbar';
import Message from '../../Reuseable Components/Message';
import { useCartStorage } from '@/Contexts/ShoppingCart';
import TextBannerCarousel from '@/AppComponents/NavbarShowCase/TextBannerCarousel';
import  Spinner  from "../../Reuseable Components/Spinner/Spinner";
import { useAuthenticator } from '@/Contexts/Authenticator';
// import Spinner from '@/Reuseable Components/Spinner/Spinner';

function AppParentRouter() {
  let { message, isLoading } = useCartStorage();
  let { authLoading, authMessage } = useAuthenticator();
  
  return (
  
    
    <div className='bg-white'>
    
    <NavbarShowCase/>
      {(authMessage.icon && authMessage.message) ? <Message icon={authMessage.icon}  message={authMessage.message}/>: (message?.icon && message?.message) ? <Message icon={message.icon}  message={message.message}/> :""}
     
      <div className={`fixed z-[1000] flex w-[100%] justify-center mt-[120px]`}>
        {isLoading || authLoading ? <Spinner /> :""} 
      </div>
      
    
      <div className='h-[50px]'>

      </div>
      <TextBannerCarousel/>
      <Outlet/>

     
    </div>
  );
}

export default AppParentRouter;
