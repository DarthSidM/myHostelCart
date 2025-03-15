import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Function to get JWT from cookies
const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(row => row.startsWith("jwt=")); // Adjust if your cookie name is different
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

// ProtectedRoute Component
const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
// In this snippet, we define a ProtectedRoute component that checks if the user is authenticated by verifying the presence and validity of a JWT token in the cookies. If the user is authenticated, the component renders the child routes (Outlet). If the user is not authenticated, the component redirects the user to the login page.