import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = ({ logInState, handleLogout }) => {
    return (
        <header>
            <h1>chitter challenge</h1>

            <Link to="/" >Home</Link><br />
            {logInState ? (
                <>
                    <Link to="/postcomment">post comment</Link><br />
                    <button onClick={handleLogout}>Logout</button><br />
                </>
            ) : (
                <>
                    <Link to="/signup">sign up</Link><br />
                    <Link to="/signin">sign in</Link>
                </>
            )}
        </header>
    )
}

export default Header