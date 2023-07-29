import React, { useState } from 'react'
import axios from 'axios'
import { isEmail } from 'validator'

const SignUp = () => {
    // post data to server
    const submitSignUpPostRequest = async (user) => {
        try {
            // const responseData = await axios.post(`http://localhost:4000/users`, user);
            const response = await axios.post(`http://localhost:8000/signup`, user);
            return (response.data);
        }
        catch (error) {
            alert(`sign up - use state error`)
            console.dir(error)
            console.error(error);
            throw error;
        }
    }

    // set form data
    const [fullName, setFullName] = useState(``)
    const [username, setUsername] = useState(``)
    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)

    // handle form data when submitted
    const handleSignUp = async (event) => {
        event.preventDefault();
        // pass object to post request
        const createSignUpObject = { fullName, username, email, password }
        await submitSignUpPostRequest(createSignUpObject);
        console.log(createSignUpObject)
    }

    // for validation
    const required = value => {
        if (!value) { return (<div role="alert">cant be empty</div>); }
    };
    const vusername = value => {
        if (value.length < 3 || value.length > 20) {
            return (
                <div role="alert">username must be between 3-20 characters</div>
            );
        }
    };
    const vemail = value => {
        if (!isEmail(value)) { return (<div role="alert">not a valid email</div>); }
    };
    const vpassword = value => {
        if (value.length < 6 || value.length > 40) {
            return (
                <div role="alert">password must be between 6-40 characters</div>
            );
        }
    };

    return (
        <div>
            <br />SignUp

            <form onSubmit={handleSignUp}>
                <label htmlFor="fullName">full name:</label>
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={fullName}
                    onChange={event => setFullName(event.target.value)}
                    validations={[required]}
                />
                <br />

                <label htmlFor="username">username:</label>
                <input
                    type="username"
                    name="username"
                    id="username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    validations={[required, vusername]}
                />
                <br />

                <label htmlFor="email">email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    validations={[required, vemail]}
                />
                <br />

                <label htmlFor="password">password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    validations={[required, vpassword]}
                />

                <br />
                <input type="submit" value="sign up" />
            </form>

        </div>
    )
}

export default SignUp