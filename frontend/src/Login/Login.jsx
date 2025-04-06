import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import backgroundGif from "../assets/images/play.gif";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userID", response.data.userID);
      onLogin();
      navigate("/play");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("User not found. Please register first.");
      } else {
        setError(error.response?.data.message || "Error logging in");
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundGif})`,
      }}
    >
      <div className={styles.loginFormContainer}>
        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit}>
            <h2 className={styles.loginTitle}>WonderCards</h2>
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
            {error && <p className={styles.error}>{error}</p>}

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
              <button
                type="submit"
                className={styles.loginButton}
                style={{ width: "100%" }}
              >
                Login
              </button>
              <a
                to="/register"
                onClick={handleRegisterRedirect}
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
                Don't have an account? Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
