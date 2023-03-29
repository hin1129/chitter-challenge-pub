// HTTP requests
// Local Storage for user information & JWT
import axios from 'axios';

const API_URL = "http://localhost:8000/";


// post request
const signUpAuthService = async (fullName, username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {
            fullName,
            username,
            email,
            password
        });
        const data = await response.data;
        return data;
    }
    catch (error) {
        return { error };
    }
};

// post request, save jwt to local storage
const signInAuthService = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, {
            username,
            password,
        });
        const data = await response.data;
        console.log(data);

        if (data.accessToken) {
            localStorage.setItem(`user`, JSON.stringify(response.data));
        }
        return (data);
    }
    catch (error) {
        return { error };
    }
};

// // post request, save jwt to local storage - with email
// const signInAuthService = async (email, password) => {
//     try {
//         const response = await axios.post(`${API_URL}/signin`, {
//             email,
//             password,
//         });
//         const data = await response.data;
//         console.log(data);

//         if (data.accessToken) {
//             localStorage.setItem(`user`, JSON.stringify(response.data));
//         }
//         return (data);
//     }
//     catch (error) {
//         return { error };
//     }
// };

// remove jwt from local storage
const signOutAuthService = () => {
    localStorage.removeItem(`user`);
};

// get stored user information & jwt
const getCurrentUserAuthService = () => {
    return (JSON.parse(localStorage.getItem(`user`)));
};

// export functions
const authService = {
    signUpAuthService,
    signInAuthService,
    signOutAuthService,
    getCurrentUserAuthService
};

export default authService;