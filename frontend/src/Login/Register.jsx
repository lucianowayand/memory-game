import React, { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css";
import backgroundGif from "../assets/images/play.gif";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.message || "Error registering");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundGif})`,
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.container}>
          <div className="loginContainer">
            <form onSubmit={handleSubmit}>
              <h2>Register</h2>
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={styles.input}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "20px",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <button type="submit" className={styles.registerButton}>
                  Register
                </button>
                <a
                  to="/register"
                  onClick={handleLoginRedirect}
                  style={{
                    textDecoration: "underline",
                    color: "#00d9ff",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    cursor: "pointer",
                    lineHeight: "1.5",
                    marginBottom: "20px",
                    color: "#fff",
                    fontFamily: '"Press Start 2P", cursive',
                  }}
                >
                  Return to Login
                </a>
              </div>
              {message && <p className={styles.message}>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
