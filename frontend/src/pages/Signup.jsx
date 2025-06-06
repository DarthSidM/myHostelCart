import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// ...imports remain the same
const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        collegeName: '',
        phoneNumber: '',
        password: '',
    });

    const [colleges, setColleges] = useState([]);
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/college`);
                setColleges(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (err) {
                console.error("Error fetching colleges:", err);
                setColleges([]);
            }
        };
        fetchColleges();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleCaptcha = (token) => {
        setRecaptchaToken(token);
    };

    const handleGetOtp = async (e) => {
        e.preventDefault();
        if (!recaptchaToken) {
            setError('Please verify that you are not a robot.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/sendotp`, {
                phoneNumber: formData.phoneNumber,
                recaptchaToken,
            });

            if (response.data.success) {
                console.log("Navigating with:", formData, response.data.sessionId);
                navigate('/verify-otp', {
                    state: {
                        formData,
                        sessionId: response.data.sessionId,
                    },
                });
            } else {
                setError(response.data.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending OTP');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form onSubmit={handleGetOtp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">College Name</label>
                        <select
                            name="collegeName"
                            value={formData.collegeName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        >
                            <option value="">Select your college</option>
                            {colleges.map((college, index) => (
                                <option key={index} value={college}>{college}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            maxLength="10"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        />
                    </div>
                    <div className="mt-4">
                        <ReCAPTCHA sitekey={siteKey} onChange={handleCaptcha} />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Get OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
