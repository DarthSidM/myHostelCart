import { jwtDecode } from "jwt-decode";

const getDecodedToken = () => {
    const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("jwt="))
        ?.split("=")[1];

    if (!token) {
        console.log("No token found in cookies");
        return null;
    }

    try {
        // console.log("Decoded token:", jwtDecode(token));
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid JWT:", error);
        return null;
    }
};

export default getDecodedToken;