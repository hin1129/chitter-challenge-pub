import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <h1>chitter challenge</h1>

            <Link to="/" >Home</Link><br />
            <Link to="/postcomment">post comment</Link><br />
            <Link to="/signup">sign up</Link><br />
            <Link to="/signin">sign in</Link>
        </header>
    )
}

export default Header