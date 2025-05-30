// import { useState, useEffect } from "react";
// import api from "../middleware/interceptor";

// export default function ChatSidebar({ currentUserId, onSelectChat, refreshFlag }) {
//   const [chats, setChats] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedChatId, setSelectedChatId] = useState(null);

//   useEffect(() => {
//     async function fetchChats() {
//       try {
//         const response = await api.get(`/chat/fetch-chats?userId=${currentUserId}`);
//         setChats(response.data);
//       } catch (err) {
//         console.error("Error fetching chats:", err);
//         setError(err.message);
//       }
//     }

//     fetchChats();
//   }, [currentUserId, refreshFlag]);

//   const getOtherUser = (chat) => {
//     return chat.users.find((user) => user._id !== currentUserId);
//   };

//   const handleChatSelect = (chat) => {
//     setSelectedChatId(chat._id);
//     onSelectChat(chat);
//   };

//   return (
//   <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
//     <h2 className="text-xl font-bold mb-4">Chats</h2>
//     {chats.map((chat) => {
//       const otherUser = getOtherUser(chat);
//       const isSelected = chat._id === selectedChatId;

//       const hasUnread =
//         chat.latestMessage &&
//         !chat.latestMessage.isRead &&
//         chat.latestMessage.sender._id !== currentUserId;

//       return (
//         <div
//           key={chat._id}
//           onClick={() => handleChatSelect(chat)}
//           className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition 
//             ${isSelected ? "bg-gray-100 shadow-md scale-[1.02]" : "hover:bg-gray-50"}
//           `}
//         >
//           <div>
//             <p className="font-medium text-gray-900">
//               {otherUser ? otherUser.fullName : "Unknown User"}
//             </p>
//             <p className="text-sm text-gray-500 truncate">
//               {chat.latestMessage ? chat.latestMessage.content : "No messages yet"}
//             </p>
//           </div>

//           {hasUnread && (
//             <div className="ml-3 min-w-[20px] h-[20px] bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-md">
//               1
//             </div>
//           )}
//         </div>
//       );
//     })}
//   </div>
// );
// }


import { useState, useEffect } from "react";
import api from "../middleware/interceptor";

export default function ChatSidebar({ currentUserId, onSelectChat, refreshFlag }) {
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
  }, [currentUserId, refreshFlag]);

  const getOtherUser = (chat) => {
    return chat.users.find((user) => user._id !== currentUserId);
  };

  const handleChatSelect = (chat) => {
    setSelectedChatId(chat._id);
    onSelectChat(chat);
  };

  return (
    <div className="w-1/4 h-full bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Chats</h2>

      {chats.map((chat) => {
        const otherUser = getOtherUser(chat);
        const isSelected = chat._id === selectedChatId;

        const hasUnread =
          chat.latestMessage &&
          !chat.latestMessage.isRead &&
          chat.latestMessage.sender._id !== currentUserId;

        return (
          <div
            key={chat._id}
            onClick={() => handleChatSelect(chat)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-150
              ${isSelected ? "bg-gray-100 border border-gray-300" : "hover:bg-gray-50"}
            `}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {otherUser ? otherUser.fullName : "Unknown User"}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {chat.latestMessage ? chat.latestMessage.content : "No messages yet"}
              </p>
            </div>

            {hasUnread && (
              <div className="ml-3 min-w-[20px] h-[20px] bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                1
              </div>
            )}
          </div>
        );
      })}

      {error && (
        <div className="mt-4 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
