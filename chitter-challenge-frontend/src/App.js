import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Switch, Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CommentList from './components/CommentList'
import Comment from './components/Comment';
import PostComment from './components/PostComment';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';


function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<CommentList />} />
        <Route path="/postcomment" element={<PostComment />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>

      {/* <Route exact path='/comment/:id' >
        <CommentList />
      </Route> */}

      <Footer />
    </div>
  );
}

export default App;