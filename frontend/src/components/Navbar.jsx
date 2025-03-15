import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function Navbar({ userName, userProfilePic }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedProfilePic, setEditedProfilePic] = useState(userProfilePic);

  const handleProfileSave = () => {
    console.log("Updated Profile:", {
      name: editedName,
      description: editedDescription,
      profilePic: editedProfilePic,
    });
    setIsModalOpen(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white/30 backdrop-blur-md border-b shadow-lg sticky top-0 z-50">
      {/* Logo and Navigation */}
      <div className="flex items-center space-x-6">
        <h1 className="text-3xl font-extrabold text-gray-900 cursor-pointer hover:text-gray-700 transition" onClick={() => navigate("/")}>
          Hostel Market
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

      {/* Profile Dropdown */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-12 rounded-full border-2 border-gray-300 hover:border-gray-500 transition">
              <img src={userProfilePic || "/placeholder.svg"} alt={userName} className="rounded-full object-cover h-full w-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white shadow-xl rounded-lg border" align="end" forceMount>
            <DropdownMenuLabel className="font-semibold text-gray-900 px-4 py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-lg">{userName}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
              <User className="h-5 w-5 text-gray-600" />
              <span>Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600" onClick={() => navigate("/logout")}>
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Profile Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white p-6 rounded-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col items-center">
              <img src={editedProfilePic || "/placeholder.svg"} alt="Profile" className="w-24 h-24 rounded-full object-cover border shadow-md" />
              <Input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />
            </div>
            <Input type="text" placeholder="Your Name" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="border-gray-300 rounded-md" />
            <Textarea placeholder="Short description" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} className="border-gray-300 rounded-md" />
            <div className="flex justify-center">
              <Button onClick={handleProfileSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
