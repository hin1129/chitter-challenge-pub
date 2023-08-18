export const checkTokenExpiration = () => {
    // const token = cookies.get('Token')
    const token = localStorage.getItem('Token');
    const expirationTime = localStorage.getItem('TokenExpiration');

    if (token && expirationTime) {
        const currentTime = new Date().getTime();

        if (currentTime > Number(expirationTime)) { handleLogout(); }
        else { setLogInState(true); }
    }
};