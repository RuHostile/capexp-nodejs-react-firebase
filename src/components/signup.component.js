import React, { useState } from "react";
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const createAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="App">
      <form onSubmit={createAccount}>
        <h1>Create Account</h1>
        {errorMessage ? <>{errorMessage}</> : <></>}
        <br />
        <input
          className="email"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="password"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Create account</button>
      </form>
      <Link to="/">Login</Link>
    </div>
  );
}
