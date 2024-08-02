// -----------------React imports
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useReducer, useState } from 'react';

//------------------Firebase Imports

// import { useAuthenticator } from "../Contexts/Authenticator";
// -----------Internal Imports
import styles from './LoginForm.module.css';
import Spinner from '../../Reuseable Components/Spinner/Spinner';
import { useAuthenticator } from '../../Contexts/Authenticator';

let reducer = (state, action) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payLoad };
    case 'password':
      return { ...state, password: action.payLoad };
    default: {
      console.log('Action type not found');
      return { ...state };
    }
  }
};

function LoginForm() {
  let { userVarified, loginHandler, GoogleAuthHandler, isLoading } =
    useAuthenticator();
  let navigate = useNavigate();

  let initialState = {
    email: '',
    password: '',
  };

  let [{ email, password }, dispatch] = useReducer(reducer, initialState);

  // -----------------------Login with eamil and pasword
  let loginWithEmailAndPassword = (e) => {
    e.preventDefault();
    loginHandler(email, password);
    console.log(userVarified);
    if (userVarified) console.log('Varified');
  };

  return (
    <div className={`${styles.login_section}`}>
      <form
        action=""
        className={`text-light ${styles.card}  w-[330px]  text-dark bg-white h-[370px]`}
        onSubmit={loginWithEmailAndPassword}
      >
        <h1 className={`${styles.heading} text-center text-[40px]`}>Login</h1>

        <br />
        <input
          type="email"
          onChange={(e) => dispatch({ type: 'email', payLoad: e.target.value })}
          placeholder="Email"
          required
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="mt-4 bg-white"
          onChange={(e) =>
            dispatch({ type: 'password', payLoad: e.target.value })
          }
          required
          // value={password}
        />
        <br />
        <div className="d-flex justify-content-center mt-1">
          <button type="submit" className={`${styles.loginBtn} bg-primary`}>
            {isLoading ? <Spinner /> : 'Login'}
          </button>
        </div>
        <p className={` ${styles.fontsize1} text-dark`}>
          Don't have an account?{' '}
          <Link to={'/SignUp'} className="text-decoration-none">
            <strong className={`text-primary ${styles.dosisFOnt}`}>
              Sign up
            </strong>
          </Link>{' '}
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
