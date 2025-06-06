import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const VerifyOtp = () => {
    const { state } = useLocation();
    const { formData, sessionId } = state || {};
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const navigate = useNavigate();

    const handleCaptcha = (token) => {
        setRecaptchaToken(token);
        setError('');
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!recaptchaToken) {
            setError('Please verify that you are not a robot.');
            return;
        }

        try {
            // Verify OTP first
            const verifyRes = await axios.post(`${import.meta.env.VITE_API_URL}/user/verifyotp`, {
                sessionId,
                otp,
                phoneNumber: formData?.phoneNumber,
            });

            if (verifyRes.data.success) {
                // OTP verified — now signup user with fresh recaptcha token
                const signupRes = await axios.post(`${import.meta.env.VITE_API_URL}/user/usersignup`, {
                    ...formData,
                    recaptchaToken, // new fresh token from this page
                });

                if (signupRes.status === 201) {
                    navigate('/login');
                } else {
                    setError('Signup failed.');
                }
            } else {
                setError('OTP verification failed.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong during verification.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
                <p>You will receive a call for the OTP please pick it up</p>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Enter OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        />
                    </div>

                    <div className="mt-4">
                        <ReCAPTCHA sitekey={siteKey} onChange={handleCaptcha} />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-green-600 rounded-md"
                    >
                        Verify and Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
