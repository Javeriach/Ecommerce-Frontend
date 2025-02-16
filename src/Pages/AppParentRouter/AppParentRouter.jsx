import { Outlet } from 'react-router-dom';

import NavbarShowCase from '@/AppComponents/NavbarShowCase/Navbar';
import TextBannerCarousel from '@/AppComponents/NavbarShowCase/TextBannerCarousel';
import Spinner from '../../Reuseable Components/Spinner/Spinner';
// import Spinner from '@/Reuseable Components/Spinner/Spinner';

function AppParentRouter() {
  return (
    <div className="md:pt-12 pt-14 ">
      <NavbarShowCase />

      <div className={`fixed z-[1000] flex w-[100%] justify-center mt-[120px]`}>
        {/* {isLoading || authLoading ? <Spinner /> : ''} */}
      </div>

      <TextBannerCarousel />
      <Outlet />
    </div>
  );
}

export default AppParentRouter;
