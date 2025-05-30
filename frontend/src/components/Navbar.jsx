import { useNavigate } from "react-router-dom";
import { LogOut, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Navbar({ userName, userPhone }) {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between p-4 bg-white/30 backdrop-blur-md border-b shadow-lg sticky top-0 z-50">
      {/* Logo and Navigation */}
      <div className="flex items-center space-x-6">
        <h1
          className="text-3xl font-extrabold text-gray-900 cursor-pointer hover:text-gray-700 transition"
          onClick={() => navigate("/")}
        >
          Hostel Cart
        </h1>
        <Button
          variant="ghost"
          className="text-gray-800 font-medium hover:bg-gray-200 transition px-4 py-2 rounded-lg"
          onClick={() => navigate("/about")}
        >
          About Us
        </Button>
        <Button
          variant="ghost"
          className="text-gray-800 font-medium hover:bg-gray-200 transition px-4 py-2 rounded-lg"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </Button>
      </div>

      {/* Chat Icon + Profile Dropdown */}
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          className="text-gray-800 hover:bg-gray-200 transition p-2 rounded-full"
          onClick={() => navigate("/chat")}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-gray-900 font-semibold hover:bg-gray-200 transition px-4 py-2 rounded-lg">
              {userName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white shadow-xl rounded-lg border" align="end" forceMount>
            <DropdownMenuLabel className="font-semibold text-gray-900 px-4 py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-lg">{userName}</p>
                <p className="text-gray-500 text-sm">📞 {userPhone}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
              onClick={() => navigate("/logout")}
            >
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
