import React, { useEffect, useRef, useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";
import { useNavigate, useLocation, Navigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

// List of supported languages
const LANGUAGES = [
  "python3",
  "java",
  "cpp",
  "nodejs",
  "c",
  "ruby",
  "go",
  "scala",
  "bash",
  "sql",
  "pascal",
  "csharp",
  "php",
  "swift",
  "rust",
  "r",
];

function EditorPage() {
  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python3");
  const codeRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const socketRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log("Error", err);
        toast.error("Socket connection failed, Try again later");
        navigate("/");
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();

    return () => {
      socketRef.current && socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID is copied`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the room ID");
    }
  };

  const leaveRoom = async () => {
    navigate("/");
  };

  const runCode = async () => {
    setIsCompiling(true);
    try {
      const response = await axios.post("http://localhost:5000/compile", {
        code: codeRef.current,
        language: selectedLanguage,
      });
      console.log("Backend response:", response.data);
      setOutput(response.data.output || JSON.stringify(response.data));
    } catch (error) {
      console.error("Error compiling code:", error);
      setOutput(error.response?.data?.error || "An error occurred");
    } finally {
      setIsCompiling(false);
    }
  };

  const toggleCompileWindow = () => {
    setIsCompileWindowOpen(!isCompileWindowOpen);
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#000",
        backgroundImage: `
          linear-gradient(90deg, rgba(128, 0, 128, 0.3) 1px, transparent 1px),
          linear-gradient(180deg, rgba(0, 0, 255, 0.3) 1px, transparent 1px),
          linear-gradient(135deg, rgba(128, 0, 255, 0.3), rgba(0, 0, 255, 0.3))
        `,
        backgroundSize: "50px 50px",
        minHeight: "100vh",
      }}
    >
      <div className="row flex-grow-1">
        {/* Client panel */}
        <div className="col-md-2 d-flex flex-column" style={{
          background: "linear-gradient(135deg, rgba(50, 50, 50, 1), rgba(0, 0, 0, 1))", // Gradient for client panel
        }}>
          <img
            src="/images/devsync.png"
            alt="Logo"
            className="img-fluid mx-auto"
            style={{ maxWidth: "150px", marginTop: "1rem",  filter: "drop-shadow(0 0 10px #00ffff)" }}
          />
          <hr style={{ marginTop: "1.2rem" ,color:"white" }} />

          <div className="d-flex flex-column flex-grow-1 overflow-auto">
            <span className="mb-2 mt-1 text-white">Members</span>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>

          <hr />
          <div className="mt-auto mb-3">
            <button className="btn btn-success w-100 mb-2" onClick={copyRoomId} style={{
                  background: "linear-gradient(135deg, #32CD32, #006400)",    
                  color: "white",
                  border: "none",
                }}>
              Copy Room ID
            </button>
            <button className="btn btn-danger w-100" onClick={leaveRoom} style={{
                  background: "linear-gradient(135deg, rgba(255, 102, 102, 1), rgba(139, 0, 0, 1))", // Red gradient button
                  color: "white",
                  border: "none"}} >
              Leave Room
            </button>
          </div>
        </div>

        {/* Editor panel */}
        <div className="col-md-10 text-light d-flex flex-column" style={{
          background: "linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1))", // Gradient for editor panel
        }}>
          <div className="bg-dark p-2 d-flex justify-content-end">
            <select
              className="form-select w-auto"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#00ffff",
                border: "none",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "inset 0 0 10px rgba(0, 255, 255, 0.5)",
              }}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
      </div>

      <button
        className="btn btn-primary position-fixed bottom-0 end-0 m-3"
        onClick={toggleCompileWindow}
        style={{ zIndex: 1050, background: "linear-gradient(135deg, #32CD32, #006400)" }}
      >
        {isCompileWindowOpen ? "Close Compiler" : "Open Compiler"}
      </button>

      <div
        className={`bg-dark text-light p-3 ${
          isCompileWindowOpen ? "d-block" : "d-none"
        }`}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: isCompileWindowOpen ? "30vh" : "0",
          transition: "height 0.3s ease-in-out",
          overflowY: "auto",
          zIndex: 1040,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Compiler Output ({selectedLanguage})</h5>
          <div>
            <button
              className="btn btn-success me-2"
              onClick={runCode}
              disabled={isCompiling}
              style={{
                background: "linear-gradient(135deg, #32CD32, #006400)",  
                color: "white",
                border: "none",
              }}
            >
              {isCompiling ? "Compiling..." : "Run Code"}
            </button>
            <button className="btn btn-secondary" onClick={toggleCompileWindow} style={{
                background: "background: linear-gradient(135deg, rgba(200, 200, 200, 1), rgba(100, 100, 100, 1), rgba(255, 0, 0, 0.2))",   
                color: "white",
                border: "none",
              }}>
              Close
            </button>
          </div>
        </div>
        <pre className="bg-secondary p-3 rounded" style={{
                background: "background: linear-gradient(135deg, rgba(200, 200, 200, 1), rgba(100, 100, 100, 1), rgba(255, 0, 0, 0.2))",   
                color: "white",
                border: "none",
              }}>
          {output || "Output will appear here after compilation"}
        </pre>
      </div>
    </div>
  );
}

export default EditorPage;
