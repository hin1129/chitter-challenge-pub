import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    // if (token) {
    //   setLoggedIn(true);
    // }
  }, [])

  const cookies = new Cookies()
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('email');
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
        <Route path="/postcomment" element={<PostComment />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn setLogInState={setLogInState} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;