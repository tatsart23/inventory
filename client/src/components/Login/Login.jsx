import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  async function login(e) {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        user,
        password: pwd,
      });

      if (res.data === "exists") {
        localStorage.setItem("loggedIn", "true"); // Store the logged-in status in localStorage
        localStorage.setItem("user", user); // Optionally, store the username as well
        navigate("/", { state: { id: user } });
        window.location.reload(); // Refresh the page
      } else {
        alert("Login failed, user is not registered");
      }
    } catch (e) {
      alert("Wrong details");
      console.log(e);
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={login}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          onChange={(e) => setUser(e.target.value)}
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
        />
        <input
          className="login-btn"
          type="submit"
          value="Login"
          onClick={login}
        />
      </form>
      <br />
      <p>OR</p>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Login;
