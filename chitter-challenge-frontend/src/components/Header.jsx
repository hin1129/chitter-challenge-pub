import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Header = (loggedInState) => {
    // doesnt work
    // const cookies = new Cookies()
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(loggedInState);

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('loggedIn');
    //     cookies.remove('TOKEN');
    //     setLoggedIn(false);
    //     console.log("just logged out")
    // }
    return (
        // // doesnt work
        // <header>
        //     <h1>chitter challenge</h1>

        //     <Link to="/" >Home</Link><br />

        //     {loggedInState ? <Link to="/postcomment">post comment</Link>
        //         : null
        //     }<br />

        //     {loggedInState ? null
        //         : <Link to="/signup">sign up</Link>
        //     }<br />

        //     <Link to="/signin">sign in</Link>
        // </header>

        <header>
            <h1>chitter challenge</h1>

            <Link to="/" >Home</Link><br />
            <Link to="/postcomment">post comment</Link><br />

            {/* doesnt work */}
            {/* {loggedInState ? <Link to="/postcomment">post comment</Link>
                : null
            }<br />
            {loggedInState ? null
                : <Link to="/signup">sign up</Link>
            }<br /> */}

            <Link to="/signup">sign up</Link><br />
            <Link to="/signin">sign in</Link>
        </header>
    )
}

export default Header