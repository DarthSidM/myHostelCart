import { useState, useEffect } from "react";
import api from "../middleware/interceptor";

export default function ChatSidebar({ currentUserId, onSelectChat }) {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await api.get(`/chat/fetch-chats?userId=${currentUserId}`);
        setChats(response.data);
      } catch (err) {
        console.error("Error fetching chats:", err);
        setError(err.message);
      }
    }

    fetchChats();
  }, [currentUserId]);

  const getOtherUser = (chat) => {
    return chat.users.find((user) => user._id !== currentUserId);
  };

  const handleChatSelect = (chat) => {
    setSelectedChatId(chat._id);
    onSelectChat(chat); // Pass the whole chat object now
  };

  return (
    <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      {chats.map((chat) => {
        const otherUser = getOtherUser(chat);
        const isSelected = chat._id === selectedChatId;

        return (
          <div
            key={chat._id}
            onClick={() => handleChatSelect(chat)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition 
              ${isSelected ? "bg-gray-100 shadow-md scale-[1.02]" : "hover:bg-gray-50"}
            `}
          >
            <div>
              <p className="font-medium text-gray-900">
                {otherUser ? otherUser.fullName : "Unknown User"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {chat.latestMessage ? chat.latestMessage.content : "No messages yet"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
