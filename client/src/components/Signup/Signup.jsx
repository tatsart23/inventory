import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import "./Signup.css";

const Signup = () => {

  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  async function signup(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        user,
        password: pwd
      });

      if (res.data === "exists") {
        alert("User already exists");
      } else {
        navigate("/home", { state: { id: user } });
      }
    } catch (e) {
      alert("Wrong details");
      console.log(e);
    }
  }

  if (!loggedIn) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form className="signup-form">
        <input
          type="text"
          onChange={(e) => setUser(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
        />
        <input className="signup-btn" type="submit" value="Sign up" onClick={signup} />
      </form>
      <br />
      <p>OR</p>
      <Link to="/login">Login Page</Link>
    </div>
  );
};

export default Signup;