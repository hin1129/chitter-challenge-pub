import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CommentList from './components/CommentList'
import PostComment from './components/PostComment';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import EmailVerification from './components/EmailVerification';
import Cookies from 'universal-cookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios';

function App() {
  const [logInState, setLogInState] = useState(false);
  const cookies = new Cookies()

  const handleLogout = () => {
    // localStorage.removeItem('Token');
    // localStorage.removeItem('TokenExpiration');
    // localStorage.removeItem('LoggedIn');
    // localStorage.removeItem('Username');
    localStorage.clear();
    cookies.remove('Token');
    setLogInState(false);
  }

  const checkTokenExpiration = () => {
    // const token = localStorage.getItem('Token');
    const expirationTime = localStorage.getItem('TokenExpiration');

    const token = cookies.get('Token')
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // const decodedToken = jwt_decode(Token)
    // const expirationTime = decodedToken.exp * 1000

    if (token && expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > Number(expirationTime)) { handleLogout(); }
      else { setLogInState(true); }
    }
  };

  useEffect(() => {
    checkTokenExpiration();

    // Set up interval to periodically check the token's expiration status
    const interval = setInterval(checkTokenExpiration, 1000); // Check every second

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Header logInState={logInState} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<CommentList />} />

        <Route
          path="/postcomment"
          element={logInState ? <PostComment /> : <Navigate to="/signin" />}
        />

        <Route
          path="/signup"
          element={logInState ? <Navigate to="/" /> : <SignUp />}
        />

        <Route path="/emailverification/:token" element={<EmailVerification />} />

        <Route
          path="/signin"
          element={logInState ? (
            <Navigate to="/" />
          ) : (
            // <SignIn setLogInState={setLogInState} handleLogout={handleLogout} />
            <SignIn setLogInState={setLogInState} />
          )}
        />
      </Routes>

      <Footer />
    </div >
  );
}

export default App;