import { useEffect } from 'react';

// Internal imports
import { useOrdersUserContext } from '@/Contexts/OrdersUsersContext';
import DashboardSingleUserCreater from './DashboardSingleUserCreater';
import Style from './DashboardUsers.module.css';
import Spinner from '@/Reuseable Components/Spinner/Spinner';
function DashboardUsers() {
  
  let { usersList, fetchUsersList,isLoading } = useOrdersUserContext();
  useEffect(() => {
    fetchUsersList();
  }, []);

  return (
    <div className={` ${Style.tablewrapper} `}>
      {isLoading ? (
        <div className="d-flex  justify-content-center h-100  align-items-center w-100">
          {' '}
          <Spinner />{' '}
        </div>
      ) : usersList?.length > 0 ? (
        <table className={Style.table}>
          <thead>
              <tr className={`${Style.tableHeadsection}`}>
              <td className={`text-center font-medium`}>Sr.NO</td>
              <td className={`text-center font-medium`}>Name</td>
              <td className={`text-center font-medium`}>Email</td>
              <td className={`text-center font-medium`}>UID</td>
              <td className={`text-center font-medium`}>Date</td>
            </tr>
          </thead>

          <tbody className="w-100 h-100 ">
            {usersList?.map((user, index) => (
              <DashboardSingleUserCreater index={index} key={index} user={user} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="d-flex h-100 w-100 justify-content-center align-items-center">
         <p>No user Available</p>
        </div>
      )}
    </div>
  );
}

export default DashboardUsers;
