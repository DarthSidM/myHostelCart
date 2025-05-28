import { useEffect, useState } from "react";
import api from "../middleware/interceptor";
import socket from "../lib/socket";

export default function ChatWindow({ selectedChat, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  // Fetch messages when chat changes
  useEffect(() => {
    if (!selectedChat?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/chat/messages/${selectedChat._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages.");
      }
    };

    fetchMessages();
  }, [selectedChat?._id]);

  // Join chat room and listen for new messages
  useEffect(() => {
    if (!selectedChat?._id) return;

    const chatId = selectedChat._id;

    // Join chat room
    socket.emit("join chat", chatId);
    console.log("📡 Joined chat room:", chatId);

    // Handle new message received
    const handleNewMessage = (newMessage) => {
      if (newMessage.chat._id === chatId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("message received", handleNewMessage);

    return () => {
      socket.off("message received", handleNewMessage); // clean up listener
      socket.emit("leave chat", chatId); // leave chat room on unmount
    };
  }, [selectedChat?._id]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const res = await api.post(`/chat/message`, {
        senderId: currentUserId,
        chatId: selectedChat._id,
        content: input,
      });

      setMessages((prev) => [...prev, res.data]); // local echo
      socket.emit("new message", res.data); // emit to server
      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message.");
    }
  };

  const otherUser = selectedChat?.users?.find(
    (user) => user._id !== currentUserId
  );

  if (!selectedChat?._id) {
    return (
      <div className="w-3/4 flex items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col w-3/4 h-full">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-md border-b rounded-t-md">
        <h2 className="text-lg font-semibold text-gray-900">
          {otherUser?.fullName || "Chat"}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender._id === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender._id === currentUserId
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
