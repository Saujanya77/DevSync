import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room Id is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both the fields are required");
      return;
    }

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("Room is created");
  };

  // when enter is pressed, also join room
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#000", // Black base color
        backgroundImage: `
          linear-gradient(90deg, rgba(128, 0, 128, 0.3) 1px, transparent 1px), /* Vertical purple lines */
          linear-gradient(180deg, rgba(0, 0, 255, 0.3) 1px, transparent 1px), /* Horizontal blue lines */
          linear-gradient(135deg, rgba(128, 0, 255, 0.3), rgba(0, 0, 255, 0.3)) /* Diagonal blend */
        `,
        backgroundSize: "50px 50px", // Adjust the grid spacing
        minHeight: "100vh",
      }}
    >
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6">
          <div
            className="card shadow-sm p-2 mb-5 rounded"
            style={{
              border: "2px solid yellow", // Border color for the card
              background: "linear-gradient(135deg, black, #6a0dad, #00ffff, #000080)", // Gradient for the card
              boxShadow: "0 0 20px 10px rgba(255, 255, 0, 0.8)", // Glowing yellow shadow
            }}
          >
            <div className="card-body text-center bg-dark">
              <img
                src="/images/devsync.png"
                alt="Logo"
                style={{
                  width: "100px",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 0 10px #00ffff)",
                }}
              />

              <h4 className="card-title text-light mb-4">Enter the ROOM ID</h4>

              <div className="form-group">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="form-control mb-2"
                  placeholder="ROOM ID"
                  onKeyUp={handleInputEnter}
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "#00ffff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "inset 0 0 10px rgba(0, 255, 255, 0.5)",
                    placeholder: {
                      color: "white", // Placeholder color
                    },
                  }}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control mb-2"
                  placeholder="USERNAME"
                  onKeyUp={handleInputEnter}
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "#00ffff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "inset 0 0 10px rgba(0, 255, 255, 0.5)",
                    placeholder: {
                      color: "white", // Placeholder color
                    },
                  }}
                />
              </div>
              <button
                onClick={joinRoom}
                className="btn btn-lg btn-block"
                style={{
                  background: "linear-gradient(135deg, #32CD32, #006400)", // Green gradient button
                  color: "white",
                  border: "none",
                }}
              >
                JOIN
              </button>
              <p className="mt-3 text-light">
                Don't have a room ID? Create{" "}
                <span
                  onClick={generateRoomId}
                  className="text-success p-2"
                  style={{
                    cursor: "pointer",
                    color: "linear-gradient(135deg, #32CD32, #006400)",
                  }}
                >
                  New Room
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
