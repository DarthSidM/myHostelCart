// export default function Chat() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Chat Feature Coming Soon!</h1>
//         <p className="text-gray-600 text-lg mb-4">
//           We're excited to announce that a chat feature is in the works! Stay tuned for updates as we enhance your experience on The Hostel Cart.
//         </p>
//         <p className="text-gray-700 text-lg text-center mt-6">
//           In the meantime, feel free to explore our platform and connect with fellow students through listings and comments.
//         </p>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import getDecodedToken from "../lib/auth";
import socket from "../lib/socket";

export default function Chat() {
  const decodedUser = getDecodedToken();
  const [selectedChat, setSelectedChat] = useState(null); // Store full chat object

  useEffect(() => {
    if (decodedUser?.userId) {
      socket.emit("setup", decodedUser.userId);
    }
  }, [decodedUser?.userId]);

  
  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar
        currentUserId={decodedUser.userId}
        onSelectChat={setSelectedChat} // Pass function to set selected chat
      />

      <ChatWindow
        selectedChat={selectedChat} // Pass the full chat object
        currentUserId={decodedUser.userId}
      />
    </div>
  );
}
