import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user data from local storage or any other storage
        localStorage.removeItem('jwTokenInLocalStorage');
        
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/" // Clear JWT from Cookies
        console.log("deleting cookie and localStorageJWT");
        // Redirect to login page
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;