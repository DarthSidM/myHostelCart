import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginIllustration from '../assets/login.svg'; // Replace with your own image
import ReCAPTCHA from 'react-google-recaptcha';
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const navigate = useNavigate();

    const handleCaptcha = (token) => {
        setRecaptchaToken(token);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaToken) {
            setError('Please verify that you are not a robot.');
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/userlogin`,
                { phoneNumber, password, recaptchaToken },
                { withCredentials: true }
            );

            if (response.status === 200) {
                localStorage.setItem('jwTokenInLocalStorage', JSON.stringify(response.data.token));
                console.log('Login successful:', response.data.token);
                navigate('/home');
            }
        } catch (err) {
            console.error('Login error:', err.response?.data?.message || 'Something went wrong');
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4 py-12">
            <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full">
                {/* Image section */}
                <div className="md:w-1/2 hidden md:flex items-center justify-center bg-blue-50 p-6">
                    <img
                        src={loginIllustration}
                        alt="Login Illustration"
                        className="w-3/4 h-auto object-contain"
                    />
                </div>

                {/* Form section */}
                <div className="w-full md:w-1/2 p-8 space-y-6">
                    <h2 className="text-3xl font-bold text-blue-800 text-center">Login</h2>
                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                maxLength="10"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <ReCAPTCHA
                            sitekey={siteKey}
                            onChange={handleCaptcha}
                        />
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;