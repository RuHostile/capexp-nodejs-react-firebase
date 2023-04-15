import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential);
        navigate("/dashboard");
         
      })
      .catch((error) => {

         console.log(error);
         setErrorMessage(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div className="App">
      <form onSubmit={handleLogin} to={"/dashboard"}>
        <h1>Login</h1>
        {errorMessage ? <>{errorMessage}</> : <></>}
        <br/>
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
        <button type="submit">Login</button>
      </form>
      <Link to="/signup"> create an account</Link>
    </div>
  );
}
