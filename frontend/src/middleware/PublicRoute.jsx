import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Function to get JWT from cookies
const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(row => row.startsWith("jwt=")); 
    return tokenCookie ? tokenCookie.split("=")[1] : null;
};

// Function to check if the user has a valid token
const isAuthenticated = () => {
    const token = getTokenFromCookies();
    
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
        return decodedToken.exp > currentTime; // Check if token is expired
    } catch (error) {
        console.error("Invalid token:", error);
        return false;
    }
};

// PublicRoute Component: Redirect logged-in users away from login/signup
const PublicRoute = () => {
    return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
