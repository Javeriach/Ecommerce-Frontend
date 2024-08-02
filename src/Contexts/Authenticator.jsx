import { useContext, createContext, useState,useEffect } from 'react';
import {
  Auth,
  fireDatabase,
} from '../Config/Config-firebase';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { signOut } from 'firebase/auth';
import {
  getDocs,
  doc,
  setDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

let AuthenticaterContext = createContext(null);


function Authenticator({ children }) {
  let [authLoading, setAuthLoading] = useState(false);
  let [userVarified, setVarified] = useState(false);
  let [currentUserID, setCurrentUserId] = useState('');
  let [currentUserDetails, setCurrentUser] = useState({});
  let [userSignup, setUserSignUp] = useState(false);
  


  async function maintainUserSession()
  {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user);

    if (user?.name)
    {
      setCurrentUser(user);
      if (Auth?.currentUser?.name) return;
      
    }
  }


  async function previouseUserLogin() {
    try {
      setAuthLoading(true);
      let collectionRef = collection(fireDatabase, 'Users');
      let data = query(collectionRef, where('email', '==', Auth?.currentUser?.email));
      const result = await getDocs(data);
      let user = [];
      result.docs.forEach(item => {
        user.push({ ...item.data(), id: item.id });
      });
      console.log(user);
      if (user.length) {
        setCurrentUser(user ? user[0] : {});
      }
      
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setAuthLoading(false);
    }
  }
 
  
  useEffect(() => {
  
    onAuthStateChanged(Auth, (data) =>
    {
      if (userSignup) return;
      if (data?.email)
      {
        console.log(data.email);
        previouseUserLogin()
        
       }

    })

    
  }, []);

  // ******************************************SignUp Handler

  // ======================function to maintain state persistance across the current session until the
  //the window or application is closed;

  // const setAuthPersistence = async () => {
  //   try {
  //     await Auth.setPersistence(Auth.Persistence.SESSION);
  //   } catch (error) {
  //     console.error('Error setting persistence:', error);
  //   }
  // };


  let signUpHandler = async (fname, lname, email, password) => {
    if (Auth?.currentUser?.email === email)
      {
      toast.success(`Your account has already been created and you
          are logined currently!!!`);
          
      throw new Error("")
    }

    if (Auth?.currentUser?.email)
      {
        toast.error(`One User is already login!!! Firstly Logout!!!`);

            throw new Error("One user is already logged in!!!");
    }
    
    
    try {

      // await setAuthPersistence();
      setAuthLoading(true);
      await createUserWithEmailAndPassword(Auth, email, password);
      setUserSignUp(true);
      let docRef = doc(fireDatabase, 'Users', Auth?.currentUser.uid);
      await setDoc(docRef, { name: fname + ' ' + lname, email: email,date:new Date(),uid:Auth?.currentUser?.uid });
      setAuthLoading(false);
      // message
      toast.success(`User Created Successfully!Login Now`);
      // ---handling local storage
      localStorage.setItem("currentUser", JSON.stringify({}));
      localStorage.setItem("products", JSON.stringify([]));
      signOut(Auth);

    } catch (err) {
     
      
      // error handling
      if (err.code?.includes("auth/email-already-in-use")) {
        toast.error(`User Already Exist`);
      }
      else if (err.code?.includes("weak-password")) {
        toast.error(`Week Password At least 6 characters long`);
      }
      else if(err.message != "One user is already logged in!!!"){
        toast.error(`Network Connectivity Error`);
        
      }
      
      throw new Error(err.message);

    } finally {
      setAuthLoading(false);
    }
  };

  // -----------------------Login with eamil and pasword
  let loginHandler = async (email, password) => {
    
    try {

      if (Auth?.currentUser?.email) {
        console.log(Auth?.currentUser.email);
        // message
        toast.error(`One User is already logined in!`);

        throw new Error("One user is already logged in!!!")
      }
      // await setAuthPersistence();

      // Loading
      setAuthLoading(true);
      //------------------ sign -in
      await signInWithEmailAndPassword(Auth, email, password);
      let collectionRef = collection(fireDatabase, 'Users'); //getting the reference of the collection
      let data = query(collectionRef, where('email', '==', email));
      const result = await getDocs(data);

      console.log(result);
      let filteredData = result.docs.map((user) => ({
        ...user.data()
      }));
    
  
      setCurrentUser(filteredData[0]);
      setAuthLoading(false);
      setVarified(true);
      
      setCurrentUserId(Auth?.currentUser.uid);
      toast.success(`Login Successfull!`);
       localStorage.setItem("currentUser", JSON.stringify({}));
          localStorage.setItem("products", JSON.stringify([]));

    } catch (err) {
      if (err.code == 'auth/invalid-credential') {
        toast.error(`Email or Password is incorrect`);

      } else if(err.message != "One user is already logged in!!!"){
        toast.error("Login Failed!");
       
      }
      throw new Error(err.message);
    } finally {
      setAuthLoading(false);
    }
  };



  // --------------Logout Handler

  let signOutHandler = async () => {

    // ------------clearing the local storage
    localStorage.setItem("currentUser", JSON.stringify({}));
    localStorage.setItem("products", JSON.stringify([]));

    try {
      if (!Auth?.currentUser?.email)
        {
          
        toast.error(`No User Logined in!!!`);
        return false;
      }
      setAuthLoading(false);
      await signOut(Auth);
      setCurrentUser({});
      toast.success(`Logout Successfully`);
      return true;
     
    } catch (err) {

      toast.success(`Logout Failed!`);

      throw new Error(err.message);

    } finally {

      setAuthLoading(false);

    }
  };

  return (
    <AuthenticaterContext.Provider
      value={{
        signUpHandler,
        signOutHandler,
        loginHandler,
        maintainUserSession,
        currentUserDetails,
        currentUserID,
        userVarified,
        authLoading,
      
      }}
    >
      {children}
    </AuthenticaterContext.Provider>
  );
}

function useAuthenticator() {
  let context = useContext(AuthenticaterContext);
  if (!context) {
    throw new Error("Context api is undefined");
  }
  console.log(context)
  return context;
}

export { Authenticator, useAuthenticator };
