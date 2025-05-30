import { useEffect, useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import getDecodedToken from "../lib/auth";
import socket from "../lib/socket";

export default function Chat() {
  const decodedUser = getDecodedToken();
  const [selectedChat, setSelectedChat] = useState(null); // Store full chat object
  const [refreshChats, setRefreshChats] = useState(false); // State to trigger re-fetching chats

  useEffect(() => {
    if (decodedUser?.userId) {
      socket.emit("setup", decodedUser.userId);
    }
  }, [decodedUser?.userId]);

  
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <ChatSidebar
        currentUserId={decodedUser.userId}
        onSelectChat={setSelectedChat} // Pass function to set selected chat
        refreshFlag={refreshChats}
      />

      <ChatWindow
        selectedChat={selectedChat} // Pass the full chat object
        currentUserId={decodedUser.userId}
        setRefreshChats={setRefreshChats} // Pass function to trigger re-fetching chats
      />
    </div>
  );
}
