import { useEffect } from "react";
import Style from "./DashboardOrders.module.css";
import { useOrdersUserContext } from "@/Contexts/OrdersUsersContext";
import SingleOrderDetail from "./SingleOrderDetail";
import Spinner from "@/Reuseable Components/Spinner/Spinner";
function DashboardOrders() {

    let { DashboardOrders,fetchDashboardOrders,isLoading,error} =useOrdersUserContext();

    useEffect(() =>
    { 
        fetchDashboardOrders();
      
    }, [])
    

        return (
  
            <div className={` ${Style.tablewrapper} `}>
            {error?.type =='dashboardOrders' && error?.errorText =="Dashboard fetching failed" ?
              
              <div className="w-[100%] h-[100%] flex justify-center items-center"> 
                        <p>Orders Fetching Failed</p>
              </div>:
              isLoading ? <div className='flex justify-center [w-100%] h-[100%] '> <Spinner />  </div> :
             DashboardOrders?.length > 0 ?
                <table className={Style.table}>
                <thead >
                  <tr className={`${Style.tableHeadsection} h-[70px]`}>
                    <th className='text-center'>S.NO</th>
      
                    <th className={` text-center`}>Customer ID</th>
      
                    <th className="text-center">Customer Email</th>
      
                    <th className="text-center">Order ID</th>
      
                                    <th className={`text-center`}>Date</th>
                                    <th className={`text-center`}>Status</th>

                  </tr>
                </thead>
      
                <tbody className='w-100'>
                { DashboardOrders?.map((item, index) => (
                    <SingleOrderDetail index={index} key={index} item = {item} />
                    ))}
                </tbody>
                  </table> :<div className="w-[100%] h-[100%] flex justify-center items-center"> 
                        <p>Orders Not available</p>
              </div>
                  
            }
            </div>
        
        );
    
}

export default DashboardOrders
