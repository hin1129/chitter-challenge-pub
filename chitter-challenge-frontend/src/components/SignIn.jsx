import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'

const SignIn = ({ setLogInState }) => {
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const cookies = new Cookies()
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/signin", { email, password, });
            console.log(response);
            // cookies (in cookies session) accessible across all pages of website
            cookies.set("TOKEN", response.data.token, { path: "/", })
            // store token and user status to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('username', response.data.username);
            setLogInState(true)
            navigate('/')
        }
        catch (error) {
            alert(`SignIn - handleSignIn`)
            console.log(error)
        }
    };

    // validation
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
            </form>
        </div>
    )
}

export default SignIn