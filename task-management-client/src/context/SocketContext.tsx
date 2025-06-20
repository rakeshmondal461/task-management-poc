// src/context/SocketContext.js
import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

// Create a context
export const SocketContext = createContext(null);

// Socket provider component
export const SocketProvider = ({ children }) => {
  // Initialize Socket.IO client (update the URL as needed)
  const socket = io("http://localhost:4001", {
    autoConnect: true, // Automatically connect to the server
  });

  useEffect(() => {
    // Connect to the socket server
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
