import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/firebase";
import { useUser } from "../../context/UserContext";
import styles from "./Login.module.css";
import Page from "../fragments/Page";

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
        <div className={styles.inputGroup}></div>
        <div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
        </div>
        <div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </Page>
  );
}

export default Login;
