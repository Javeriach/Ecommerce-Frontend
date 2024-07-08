import { useContext, createContext, useState,useEffect } from 'react';
import {
  Auth,
  GoogleAuthenticator,
  fireDatabase,
} from '../Config/Config-firebase';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
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

let AuthenticaterContext = createContext(null);


function Authenticator({ children }) {
  let [authLoading, setAuthLoading] = useState(false);
  let [userVarified, setVarified] = useState(false);
  let [currentUserID, setCurrentUserId] = useState('');
  let [currentUserDetails, setCurrentUser] = useState({});
  let [userSignup, setUserSignUp] = useState(false);
  
  let [authMessage, setAuthMessage] = useState({ icon: '', message: '' });


  useEffect(() => {

    setTimeout(() => {
      if (authMessage?.icon) {
        setAuthMessage({ icon: '', message: "" });
      }

    }, [2000]);

  }, [authMessage]);


  // useEffect(() =>
  // {
  //   signOut(Auth);
  // })

  async function maintainUserSession()
  {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user);

    if (user?.name)
    {
      setCurrentUser(user);
      if (Auth?.currentUser?.name) return;
      // try {
      //   signInWithEmailAndPassword(Auth, user?.email, user?.password);

      // } catch (err)
      // {
      //   throw new Error(err.message);
      // }
      
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
        setAuthMessage(
          {
            icon: 'crossMark', message: `Your account has already been created and you
            are logined currently!!!` });
          
      throw new Error("")
    }

    if (Auth?.currentUser?.email)
      {
        setAuthMessage(
          {
            icon: 'crossMark', message: `One User is already login!!! Firstly Logout!!!` });
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
      setAuthMessage( { icon: 'successMark', message: 'User Created Successfully!Login Now' });
      localStorage.setItem("currentUser", JSON.stringify({}));
      localStorage.setItem("products", JSON.stringify([]));
      signOut(Auth);

    } catch (err) {
     
      
      // error handling
      if (err.code?.includes("auth/email-already-in-use")) {
        setAuthMessage({ icon: 'crossMark', message: 'User Already Exist' });
      }
      else if (err.code?.includes("weak-password")) {
        setAuthMessage({
          icon: 'crossMark', message: `Week Password
          At least 6 characters long` });
      }
      else if(err.message != "One user is already logged in!!!"){
        setAuthMessage({ icon: 'crossMark', message: `Network Connectivity Error` });
        
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
        setAuthMessage(
          { icon: 'crossMark', message: `One User is already logined in!` });
        throw new Error("One user is already logged in!!!")
      }
      // await setAuthPersistence();

      // Loading
      setAuthLoading(true);
      // singing
      await signInWithEmailAndPassword(Auth, email, password);
      let collectionRef = collection(fireDatabase, 'Users'); //getting the reference of the collection
      let data = query(collectionRef, where('email', '==', email));
      const result = await getDocs(data);

      console.log(result);
      let filteredData = result.docs.map((user) => ({
        ...user.data()
      }));
    
  
      console.log(filteredData);
      setCurrentUser(filteredData[0]);
      setAuthLoading(false);
      setVarified(true);
      
      setCurrentUserId(Auth?.currentUser.uid);
      setAuthMessage(
       {icon: 'successMark', message: 'Login Successfull!' });
       localStorage.setItem("currentUser", JSON.stringify({}));
          localStorage.setItem("products", JSON.stringify([]));

    } catch (err) {
      if (err.code == 'auth/invalid-credential') {
        setAuthMessage({
          icon: 'crossMark',
          message: 'Email or password is not correct'
        });
      } else if(err.message != "One user is already logged in!!!"){
        setAuthMessage( { icon: 'crossMark', message: 'Login Failed' 
        });
       
      }
      throw new Error(err.message);
    } finally {
      setAuthLoading(false);
    }
  };



  // --------------Logout Handler

  let signOutHandler = async () => {
    localStorage.setItem("currentUser", JSON.stringify({}));
    localStorage.setItem("products", JSON.stringify([]));

    try {
      if (!Auth?.currentUser?.email)
        {
          setAuthMessage(
          {icon: 'crossMark', message: `No User Logined in!!!` });
        return false;
      }
      setAuthLoading(false);
      await signOut(Auth);
      setCurrentUser({});
      setAuthMessage( { icon: 'successMark', message: 'Logout Successful' });
      return true;
     
    } catch (err) {
      console.log(err.message);
      setAuthMessage({ icon: 'crossMark', message: 'Logout  Failed' });
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
        authMessage,
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
  return context;
}

export { Authenticator, useAuthenticator };
