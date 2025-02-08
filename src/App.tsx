import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Define the type for messages
type Message = string;

// Connect to WebSocket server
const socket = io("https://server-chat-app-1.onrender.com", {
  transports: ["websocket", "polling"], // Ensures compatibility
  withCredentials: true, // Ensures cookies and auth headers are sent
})

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);

  useEffect(() => {
    const messageHandler = (data: Message) => {
      setChat((prevChat) => [...prevChat, data]); // Append new messages
    };

    // Listen for incoming messages
    socket.on("receive_message", messageHandler);

    // Cleanup function
    return () => {
      socket.off("receive_message", messageHandler);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", message); // Send message to server
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white text-center py-3 text-lg font-semibold">Chat App</div>
        <div className="p-4 h-96 overflow-y-auto flex flex-col space-y-2">
          {chat.map((msg, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded-md text-sm self-start">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex items-center border-t p-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;