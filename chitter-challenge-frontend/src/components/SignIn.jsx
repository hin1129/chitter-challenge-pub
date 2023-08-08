import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'

const SignIn = ({ setLogInState, handleLogout }) => {
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    // const [errors, setErrors] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState(``);
    const cookies = new Cookies()
    const navigate = useNavigate();

    const submitSignUpPostRequest = async (user) => {
        try {
            const response = await axios.post("http://localhost:8000/signin", (user))
            return (response.data)
        }
        catch (error) {
            alert(`SignIn - handleSignIn`)
            console.log(error)
            throw error
        }
    }

    const handleSignIn = async (event) => {
        event.preventDefault();

        // validation
        const validationErrors = {};
        if (!email) { validationErrors.email = 'Email is required.'; }
        if (!password) { validationErrors.password = 'Password is required.'; }
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) { return; }

        try {
            const user = { email, password }
            const responseData = await submitSignUpPostRequest(user)
            // cookies (in cookies session) accessible across all pages of website
            cookies.set("TOKEN", responseData.token, { path: "/", })

            // const expirationTime = new Date().getTime() + 10000; // 10 seconds (10000 milliseconds)
            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 10 seconds (10000 milliseconds)
            localStorage.setItem('token', responseData.token)
            localStorage.setItem('tokenExpiration', expirationTime);
            localStorage.setItem('loggedIn', true)
            localStorage.setItem('username', responseData.username)
            setLogInState(true)
            navigate('/')
        }
        catch (error) {
            alert(`SignIn - handleSignIn`)
            console.log(error)

            if (error?.response?.status === 404) {
                setErrors({ email: 'Email does not exist', password: '' });
            }
            else if (error?.response?.status === 400) {
                setErrors({ ...errors, password: 'Invalid password' });
            }
            else {
                setErrors({ email: '', password: 'An unknown error occurred' });
            }
        }
    }

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem('token');
            const tokenExpirationTime = localStorage.getItem('tokenExpiration');

            if (token && tokenExpirationTime) {
                const currentTime = new Date().getTime();
                if (currentTime > tokenExpirationTime) { handleLogout() }
            }
        }
        // check token expiration status (every second)
        const interval = setInterval(checkTokenExpiration, 1000)
        // Clean up the interval when the component is unmounted
        return () => { clearInterval(interval) }
    }, [])

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        setErrors({ ...errors, email: '' })
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        setErrors({ ...errors, password: '' })
    }

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
                    onChange={handleEmailChange}
                />
                {errors.email && <div role="alert">{errors.email}</div>}
                <br />

                <label htmlFor="password">password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {errors.password && <div role="alert">{errors.password}</div>}
                <br />

                <input type="submit" value="sign in" />
            </form>
        </div>
    )
}

export default SignIn