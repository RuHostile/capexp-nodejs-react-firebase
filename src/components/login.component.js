import "../index.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    // <div className="App">
    //   <form onSubmit={handleLogin} to={"/dashboard"}>
    //     <h1>Login</h1>
    //     {errorMessage ? <>{errorMessage}</> : <></>}
    //     <br/>
    //     <input
    //       className="email"
    //       placeholder="enter your email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     ></input>
    //     <input
    //       className="password"
    //       placeholder="enter your password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     ></input>
    //     <button type="submit">Login</button>
    //   </form>
    //   <Link to="/signup"> create an account</Link>
    // </div>
    <div
      className="login-container d-flex  justify-content-center align-items-center"
      style={{ backgroundColor: "#57C5B6" }}
    >
      <form
        onSubmit={handleLogin}
        to={"/dashboard"}
        className=" rounded p-3 "
        style={{ backgroundColor: "#159895", width: "350px" }}
      >
        <h1>Login</h1>
        {errorMessage ? <>{errorMessage}</> : <></>}
        <div class="form-outline mb-4">
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label class="form-label" for="form2Example1">
            Email address
          </label>
        </div>
        <div class="form-outline mb-4">
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label class="form-label" for="form2Example2">
            Password
          </label>
        </div>
        <button type="submit" class="btn btn-primary btn-block mb-4">
          Login
        </button>
        <div class="row mb-4">
          <div class="col d-flex justify-content-center">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
              />
              <label class="form-check-label" for="form2Example31">
                Remember me
              </label>
            </div>
          </div>

          <div class="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <div class="text-center">
          <p>
            Not a member?<Link to="/signup"> Register </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
