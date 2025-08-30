import React, { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const signup = async () => {
    try {
      await axios.post("/api/signup", { email, password });
      setMessage("✅ User signed up!");
    } catch (err) {
      setMessage("❌ " + err.response.data.error);
    }
  };

  const login = async () => {
    try {
      const res = await axios.post("/api/login", { email, password });
      setToken(res.data.token);
      setMessage("✅ Logged in!");
    } catch (err) {
      setMessage("❌ " + err.response.data.error);
    }
  };

  const getProtected = async () => {
    try {
      const res = await axios.get("/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("❌ " + err.response.data.error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Easy Auth App 🚀</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br/><br/>
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br/><br/>
      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
      <button onClick={getProtected}>Get Protected</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
