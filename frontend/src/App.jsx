import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import About from "./pages/About";  
import Contact from "./pages/Contact"; 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup"; 
import ProtectedRoute from "./middleware/ProtectedRoute";
import PublicRoute from "./middleware/PublicRoute";
import Logout from "./pages/Logout";
import Chat from "./pages/Chat";
import Landing from "./pages/Landing";
import VerifyOtp from "./pages/VerifyOtp";
export default function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Routes>
          {/* Public Home */}
          <Route path="/home" element={<Home />} />
           <Route path="/chat" element={<><Navbar /><Chat /></>} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/about" element={<><Navbar /><About /></>} />
            <Route path="/contact" element={<><Navbar /><Contact /></>} />
            <Route path="/logout" element={<Logout />} />
           
          </Route>

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Route>
        </Routes>

      </div>
    </Router>
  );
}