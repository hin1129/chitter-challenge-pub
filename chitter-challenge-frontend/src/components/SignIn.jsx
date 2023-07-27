import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'

const SignIn = ({ setLogInState }) => {
    const cookies = new Cookies()
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         setLoggedInState(true);
    //     }
    // }, []);

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/signin", { email, password, });
            console.log(response);
            // cookies (in cookies session) accessible across all pages of website
            cookies.set("TOKEN", response.data.token, { path: "/", })
            // set token and user status to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('loggedIn', true);
            setLogInState(true)
            navigate('/')
        }
        catch (error) {
            console.log(error)
            error = new Error()
        }
    };

    // for validation
    const required = value => {
        if (!value) { return (<div role="alert">cant be empty</div>); }
    };

    return (
        <div>
            <br />SignIn

            <form onSubmit={handleSignIn}>
                <label htmlFor="email">email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    validations={[required]}
                />
                <br />

                <label htmlFor="password">password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    validations={[required]}
                />

                <br />
                <input type="submit" value="sign in" />

                {/* {loggedIn ? (
                    <>
                        <p>you are logged in successfully</p>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <br />
                        <input type="submit" value="sign in" />
                        <p>you are not logged in</p>
                    </>
                )} */}
            </form>
        </div>
    )
}

export default SignIn