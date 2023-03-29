import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CommentList from './components/CommentList'
import PostComment from './components/PostComment';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { useEffect } from 'react';
import { useState } from 'react'

function App() {
  const [loggedInState, setLoggedInState] = useState(false);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') { setLoggedInState(true) }
  }, [])

  return (
    <div className="App">
      <Header loggedInState={loggedInState} />

      <Routes>
        <Route path="/" element={<CommentList />} />
        <Route path="/postcomment" element={<PostComment />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn setLoggedInState={setLoggedInState} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;