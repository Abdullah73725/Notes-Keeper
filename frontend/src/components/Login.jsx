import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Auth.css";

const Login = ({ setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.text();
    if (response.ok) {
      localStorage.setItem("token", data);
      alert("Login Successful");
      window.location.reload();
    } else {
      alert(data);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <input
          className="auth-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>

        <div className="google-btn">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              localStorage.setItem(
                "google-token",
                credentialResponse.credential,
              );
              fetch("http://localhost:8080/auth/google", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  token: credentialResponse.credential,
                }),
              })
                .then((res) => res.text())
                .then((token) => {
                  localStorage.setItem("token", token);
                  window.location.href = "/";
                });
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          ></GoogleLogin>
        </div>
        <p className="auth-switch" onClick={() => setShowLogin(false)}>
          New User, Register here
        </p>
      </div>
    </div>
  );
};

export default Login;
