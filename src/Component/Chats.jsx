import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Chatting from "../assets/images/chatting.png";

const Chat = () => {
  const { participantId, userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = React.useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const nav = useNavigate();
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Effect to scroll to the bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    // Cleanup function
    return () => {
      newSocket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    fetch(`${BASE_URL}/getinfo`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((userData) => {
        setUser(userData);

        // Emit the store_socket_id event with the author's email
        if (socket && userData._id) {
          // console.log(socket);
          socket.emit("login", userData._id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [socket]);

  const fetchMessages = (otherUserId, currentUserId) => {
    fetch(`${BASE_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId,
        otherUserId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  };

  React.useEffect(() => {
    fetch(`${BASE_URL}/getinfo`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((userData) => {
        setUser(userData);

        fetchMessages(participantId, userId);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Listen for incoming messages
    if (socket) {
      socket.on("message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [socket]);

  // Function to send a new message
  const sendMessage = () => {
    if (!socket || !newMessage.trim()) return;

    const messageData = {
      senderId: userId,
      name: user.name,
      recipientId: participantId,
      content: newMessage.trim(),
    };

    socket.emit("message", messageData);

    setNewMessage("");
  };

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div
          className="chat-header"
          style={{
            backgroundColor: "#075E54",
            color: "#fff",
            padding: "10px 15px",
            position: "sticky",
            top: "0",
            zIndex: "1",
          }}
        >
          <h2>Chat</h2>
        </div>
        <div
          className="chat-container"
          style={{ flexGrow: 1, display: "flex" }}
        >
          <div
            className="chat-user-image"
            style={{
              height:"100vh",
              width: "30%",
              backgroundColor: "#f0f0f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "sticky",
              top: "0",
              overflow: "hidden",
              zIndex: "-1",
            }}
          >
          
            <img
              src={Chatting}
              alt="User Profile"
              style={{ width: "100%", position:"sticky",borderRadius: "50%" }}
            />
          </div>
          <div
            className="chat-content"
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <div
              className="messages"
              style={{
                overflowY: "auto",
                flexGrow: 1,
                marginBottom: "10px",
                paddingTop: "10px",
              }}
            >
              {messages ? (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.senderId === userId ? "own" : ""
                    }`}
                    style={{
                      display: "flex",
                      flexDirection:
                        message.senderId === userId ? "row-reverse" : "row",
                      padding: "20px",
                      borderRadius: "10px",
                      marginBottom: "10px",
                      maxWidth: "max-content",
                      backgroundColor:
                        message.senderId === userId ? "#DCF8C6" : "#DCF8C6",
                      marginLeft: message.senderId === userId ? "auto" : "10px",
                      marginRight:
                        message.senderId === userId ? "10px" : "auto",
                    }}
                  >
                    {message.senderId !== userId && (
                      <div
                        className="message-sender"
                        style={{ fontSize: "12px", color: "#888" }}
                      >
                        {/* {message.name} */}
                      </div>
                    )}
                    <div className="message-content">{message.content}</div>
                    
                  </div>
                ))
              ) : (
                <>{/* Display a message if there are no messages */}</>
              )}
            </div>
            <div
              className="chat-input"
              style={{
                display: "flex",
                alignItems: "flex-end",
                padding: "10px 15px",
                position: "sticky",
                bottom: "10px",
                zIndex: "1",
              }}
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flexGrow: 1,
                  borderRadius: "5px",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#075E54",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: "5px",
                }}
                onClick={sendMessage}
              >
                Send
              </button> <div ref={messagesEndRef} >
      </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
