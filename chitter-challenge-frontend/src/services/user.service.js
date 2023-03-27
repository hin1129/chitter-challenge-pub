// service for accessing data, which contents are available when logged in
import axios from "axios";
import authHeader from './auth-header';

const API_URL = `http://localhost:8080/api/test`;

const getPublicContent = () => {
    return (axios.get(`${API_URL}/all`));
}

const getUserBoard = () => {
    return (
        // headers = additional source of information for each API call
        // add header when requesting authorized resource
        axios.get(`${API_URL}/user`, { headers: authHeader() })
    );
}

const getModeratorBoard = () => {
    return (
        axios.get(`${API_URL}/mod`, { headers: authHeader() })
    );
}

const getAdminBoard = () => {
    return (
        axios.get(`${API_URL}/admin`, { headers: authHeader() })
    );
}

const userService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard
};

export default userService;