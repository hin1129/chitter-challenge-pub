import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CommentList from './components/CommentList'
import PostComment from './components/PostComment';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Cookies from 'universal-cookie'

function App() {
  const [logInState, setLogInState] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') { setLogInState(true) }

    // const token = localStorage.getItem('token');
    // if (token) { setLogInState(true); }
  }, [])

  const cookies = new Cookies()
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    cookies.remove('TOKEN');
    setLogInState(false);
    console.log("just logged out")
    console.log({ logInState })
  }

  return (
    <div className="App">
      <Header logInState={logInState} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<CommentList />} />
        {/* <Route path="/" element={< />} /> */}

        <Route
          path="/postcomment"
          element={logInState ? <PostComment /> : <Navigate to="/signin" />}
        />

        <Route
          path="/signup"
          element={logInState ? <Navigate to="/" /> : <SignUp />}
        />

        <Route
          path="/signin"
          element={logInState ? (
            <Navigate to="/" />
          ) : (
            <SignIn setLogInState={setLogInState} />
          )}
        />
      </Routes>

      <Footer />
    </div >
  );
}

export default App;