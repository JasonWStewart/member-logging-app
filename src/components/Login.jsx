import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/firebase";
import { useUser } from "../context/UserContext";
import Page from "./Page";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Page>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </Page>
  );
}

export default Login;
