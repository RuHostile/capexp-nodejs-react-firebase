import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  return (
    <div
      className="login-container d-flex  justify-content-center align-items-center"
      style={{ backgroundColor: "#57C5B6" }}
    >
      <form
        onSubmit={handleSubmit}
        to={"/landingpage"}
        className=" rounded p-3 "
        style={{ backgroundColor: "#159895", width: "350px" }}
      >
        <h1>Forgot Password</h1>
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
          <label class="form-label">Email address</label>
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          Reset
        </button>
        <div class="text-center">
          <p>
            Return to <Link to="/login"> Login </Link>?
          </p>
        </div>
      </form>
    </div>
  );
}
