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
import getDecodedToken from "./lib/auth";

export default function App() {
  const decodedUser = getDecodedToken();
  const userPhone = decodedUser ? decodedUser.phoneNumber : null;
  const userName = decodedUser ? decodedUser.fullName : null;
  
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Routes>
          {/* Protected Routes: Only accessible when logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<><Navbar userName={userName} userPhone={userPhone} /><About /></>} />
            <Route path="/contact" element={<><Navbar userName={userName} userPhone={userPhone} /><Contact /></>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/chat" element={<><Navbar userName={userName} userPhone={userPhone} /><Chat /></>} />
          </Route>

          {/* Public Routes: Only accessible when NOT logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}