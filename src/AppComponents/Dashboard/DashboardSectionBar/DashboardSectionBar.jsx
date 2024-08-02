import { NavLink, Outlet, Link } from 'react-router-dom';
// ------------Internal Imports
import Styles from './DashboardSectionBar.module.css';

function DashboardSectionBar() {
  return (
    <div className="w-100">
      <div className={`${Styles.section2}`}>
      
          <NavLink to="/Admin-Dashboard" className={`text-decoration-none  ${Styles.navlink} text-secondary`}>Products</NavLink>
        
              
        
          <NavLink  to="/Admin-Dashboard/Orders" className={`text-decoration-none text-secondary  ${Styles.navlink} `} >Orders</NavLink>
       
              
    
          <NavLink to="/Admin-Dashboard/Users" className={`text-decoration-none text-secondary ${Styles.navlink}`} >Users</NavLink>
      </div>

      <div className={Styles.section3}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardSectionBar;
