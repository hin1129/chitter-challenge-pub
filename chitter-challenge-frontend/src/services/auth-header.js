// retrieve data from server
// HTTP request needs Authorization header to access protected resources

const authHeader = () => {
    // checks Local Storage for "user" item
    const user = JSON.parse(localStorage.getItem(`user`));

    // if user logged in with accessToken(JWT)
    if (user && user.accessToken) {
        // return HTTP Authorization header
        // Node.js Express back-end
        return { "x-access-token": user.accessToken }
    }
    else { return {}; }
}

export default authHeader;