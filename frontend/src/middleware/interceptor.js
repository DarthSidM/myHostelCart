import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Utility function to delete the cookie
const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

// Request Interceptor: Attach JWT from LocalStorage to Requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("user");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry
api.interceptors.response.use(
    (response) => response, // Pass through valid responses
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn("Token expired or invalid. Logging out...");

            // Clear JWT from LocalStorage
            localStorage.removeItem("jwTokenInLocalStorage");

            // Clear JWT from Cookies
            deleteCookie("jwt");

            // Redirect to login page
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
