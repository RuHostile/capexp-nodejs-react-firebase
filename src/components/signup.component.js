import React, { useState } from "react";
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const createAccount = (e) => {
    setErrorMessage("");
    if(reEnterPassword != password){
      setErrorMessage("Passwords must be the same.")
      return;
    }
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="sign-up-container d-flex  justify-content-center align-items-center" style={{backgroundColor:"#57C5B6"}}>
      {/* <form onSubmit={createAccount}>
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
      <Link to="/login">Login</Link> */}

      <form
        onSubmit={createAccount}
        to={"/login"}
        className=" rounded p-3 "
        style={{ backgroundColor: "#159895", width:"350px" }}
      >
        <h1>Register Account</h1>
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
        <div class="form-outline mb-4">
          <input
            type="password"
            id="re-enter-password"
            class="form-control"
            placeholder="enter your password again"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
          />
          <label class="form-label" for="form2Example2">
            Re-enter password
          </label>
        </div>
        <button type="submit" class="btn btn-primary btn-block mb-4">
          Register
        </button>

        <div class="text-center">
          <p>
            Already have an account?<Link to="/login"> login </Link>
          </p>
        </div>
      </form>
    </div>

  );
}
