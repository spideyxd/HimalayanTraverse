import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";

const AllChat = ({ userId }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = React.useState({});

  const nav = useNavigate();
  const handleClick = (participantId, userId) => {
    nav(`/chats/${participantId}/${userId}`);
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
        // Set the user data
        if (!userData) {
          nav("/login");
        }

        setUser(userData);
      });
  }, []);

  const id = user._id;

  return (
    <>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <h2 style={{marginTop:"5vh"}}>Chats</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {user.conversations && id ? (
            user.conversations.map((conversation) => (
              <li key={conversation._id} style={{ marginBottom: "10px" }}>
                <button
                  style={{
                    backgroundColor: "#f0f0f0",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => handleClick(conversation.participantId, id)}
                >
                  {conversation.name}
                </button>
              </li>
            ))
          ) : (
            <li style={{ color: "#888" }}>No conversations to display</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default AllChat;
