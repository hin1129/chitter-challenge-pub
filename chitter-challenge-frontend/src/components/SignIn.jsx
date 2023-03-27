import React, { useEffect, useRef, useContext } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import AuthService from '../services/auth.service';
// 
// import AuthContext from '../context/AuthProvider';
// import axios from '../api/axios';

const SignIn = () => {
    // post data to server
    const submitSingInPostRequest = async (user) => {
        try {
            // const responseData = await axios.post(`http://localhost:4000/users`, user);
            const responseData = await axios.post(`http://localhost:8000/signin`, user);
            return responseData.data;
        }
        catch (error) {
            alert(`sign up - use state error`)
            console.dir(error)
        }
    }

    const [email, setEmail] = useState(``);
    const [username, setUsername] = useState(``);
    const [password, setPassword] = useState(``);
    const navigate = useNavigate();

    // doesnt work
    // const { setAuth } = useContext(AuthContext);
    // const userRef = useRef()
    // const errorRef = useRef()
    // const [errorMessage, setErrorMessage] = useState()
    const [success, setSuccess] = useState(`false`);
    // useEffect(() => {
    //     userRef.current.focus()
    // }, [])
    // useEffect(() => {
    //     setErrorMessage('')
    // }, [username, password])

    // const handleSignIn = async (event) => {
    //     event.preventDefault();
    //     // 
    //     setUsername('')
    //     setPassword('')
    //     setSuccess(true)
    // }


    // handle form data when submitted
    const handleSignIn = async (event) => {
        event.preventDefault();

        // doesnt work
        const user = { username, password }
        try {
            const response = await submitSingInPostRequest(user)
            if (response) {
                setSuccess(true)
                navigate('/')
                alert(`handleSignIn if block - loggedIn - ${success}`)
                console.log(`handleSignIn if block - ${success}`)
            }
            else { console.log(`handleSignIn else block - ${success}`) }
        } catch (error) { console.dir(error) }
    }

    // for validation
    const required = value => {
        if (!value) { return (<div role="alert">cant be empty</div>); }
    };

    return (
        <div>
            <br />SignIn

            <form onSubmit={handleSignIn}>
                <label htmlFor="username">username:</label>
                <input
                    type="username"
                    name="username"
                    id="username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    validations={[required]}
                // ref={userRef}
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
                // ref={userRef}
                />

                <br />
                <input type="submit" value="sign in" />
            </form>

        </div>
    )
}

export default SignIn