import { fireDatabase } from '@/Config/Config-firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useReducer, useContext, createContext } from 'react';

let OrdersUsersManager = createContext();

let reducer = (state, action) => {
  switch (action.type) {
    case 'isLoading':
      return { ...state, isLoading: action.payLoad };

    case 'message':
      return { ...state, OrdersUsersMessage: action.payLoad };

    case 'dashboardOrders':
      return { ...state, DashboardOrders: action.payLoad };
    
    case 'error':
      return { ...state, error: action.payLoad };
    
    case 'dashboardUsers':
      return { ...state, usersList: action.payLoad };
  }
  return state;
};
// =======================================Function
function OrdersUsersContext({ children }) {
  let initialState = {
    DashboardOrders: [],
    isLoading: false,
    OrdersUsersMessage: {},
    error: { type: 'dashboardOrders', errorText: "" },
    usersList:[]
  };

  let [state, dispatch] = useReducer(reducer, initialState);
  let { DashboardOrders, isLoading, OrdersUsersMessage ,error,usersList} = state;

  async function fetchDashboardOrders() {
    try {
      
      dispatch({ type: 'isLoading', payLoad: true });
      let collectionRef = collection(fireDatabase, 'Orders');
      let result = await getDocs(collectionRef);

      if (!result)
        throw new Error("Catarted Products fetching failed");
      let filteredData = result?.docs.map((item) => {
        return { ...item.data(), id: item.id };

      });
    
      
      dispatch({ type: 'dashboardOrders', payLoad: filteredData });
      console.log("ehhhhhhhhhhhhhhh");
    } catch (err) {
      console.log(err.code);
      dispatch({ type: 'message', payLoad: 'Orders Fetching failed' });
      dispatch({ type: 'error', payLoad: {type:'dashboardOrders',errorText:"Dashboard fetching failed"}});
      throw new Error('Error while fetching Orders');
    } finally {
      dispatch({ type: 'isLoading', payLoad: false });
    }
  }



  async function fetchUsersList() {
    try {
      
      dispatch({ type: 'isLoading', payLoad: true });
      let collectionRef = collection(fireDatabase, 'Users');
      let result = await getDocs(collectionRef);
      let filteredData = result?.docs.map((item) => {
        return { ...item.data(), id: item.id };

      });
      dispatch({ type: 'dashboardUsers', payLoad: filteredData });
      
    } catch (err) {
      dispatch({ type: 'message', payLoad: 'Users Fetching failed' });
      dispatch({ type: 'error', payLoad: {type:'dashboardUsers',errorText:"Dashboard Users fetching failed"}});
      throw new Error('Error while fetching Users');
    } finally {
      dispatch({ type: 'isLoading', payLoad: false });
    }
  }

  return (
    <OrdersUsersManager.Provider
      value={{
        fetchDashboardOrders,
        fetchUsersList,
        // --------------values
        DashboardOrders,
        isLoading,
        OrdersUsersMessage,
        error,
        usersList, 
      }}
    >
      {children}
    </OrdersUsersManager.Provider>
  );
}

function useOrdersUserContext() {
  let context = useContext(OrdersUsersManager);
  if (context) return context;
  throw new Error('Users Context is undefined');
}
export { OrdersUsersContext, useOrdersUserContext };
