// -----------------React imports
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useReducer, useState } from 'react';

//------------------Firebase Imports

// import { useAuthenticator } from "../Contexts/Authenticator";
// -----------Internal Imports
import styles from './SignUpForm.module.css';
import Google from '../Images/Google.png';
import Spinner from '../Reuseable Components/Spinner/Spinner';
import { useAuthenticator } from '../Contexts/Authenticator';

let reducer = (state, action) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payLoad };

    case 'password':
      return { ...state, password: action.payLoad };

    case 'fname':
      return { ...state, firstname: action.payLoad };

    case 'lname':
      return { ...state, lastname: action.payLoad };

    default: {
      console.log('Action type not found');

      return { ...state };
    }
  }
};

function SignUpForm() {
  let {
    userVarified,
    loginHandler,
    signUpHandler,
    isLoading,
  } = useAuthenticator();

  let navigate = useNavigate();

  let initialState = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  };

  let [{ email, password, firstname, lastname }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // -----------------------Login with eamil and pasword
    let signUp = async (e) => {
        e.preventDefault();
        try {
         await signUpHandler(firstname, lastname, email, password);
            navigate("/Login");
        } catch (error) {
            throw new Error(error.message);
        }
    
  };



  return (
    <div className={`${styles.login_section} mt-3 `}>
      <form
        action=""
        className={`text-light ${styles.card} w-[325px]
  h-[450px]  d-flex flex-column justify-content-center align-items-center `}
        onSubmit={signUp}
      >
        <h1 className={`${styles.heading} text-center`}>SignUp</h1>

        {/* First name */}
        <input
          type="text"
          onChange={(e) => dispatch({ type: 'fname', payLoad: e.target.value })}
          placeholder="Firstname"
          value={firstname}
        />
        {/* Last name */}
        <input
          required
          type="text"
          onChange={(e) => dispatch({ type: 'lname', payLoad: e.target.value })}
          placeholder="Lastname"
          value={lastname}
        />
        {/* Email */}
        <input
          required
          type="email"
          onChange={(e) => dispatch({ type: 'email', payLoad: e.target.value })}
          placeholder="Email"
          value={email}
        />
        {/* password */}
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            dispatch({ type: 'password', payLoad: e.target.value })
          }
          // value={password}
        />

        <br />

        {/* SinguUP btn */}

        <div className="d-flex justify-content-center">
          <button type="submit"  className={`${styles.signUpBtn} bg-primary`}>
            {isLoading ? <Spinner /> : 'SignUp'}
          </button>
        </div>

        {/* Already Account */}
        <p className={` ${styles.fontsize1} text-dark`}>
          Already have an account?{' '}
          <Link to={'/Login'} className="text-decoration-none">
            <strong className={`text-primary ${styles.dosisFOnt}`}>
              Login
            </strong>
          </Link>{' '}
        </p>

     
      </form>
    </div>
  );
}

export default SignUpForm;
