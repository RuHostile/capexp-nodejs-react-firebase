import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AuthDetatils() {
  const [authUser, setAuthUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
        if (location.pathname != "/signup") {
          navigate("/login");
        }
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log("sign out successful"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="nav-item">
      {authUser ? (
            <Link className="nav-link text-white text-decoration-none" variant="primary">
              {authUser.email}
            </Link>
      ) : (
        <li className="nav-item">
        <Link className="nav-link text-white text-decoration-none" to="/login"> Signin </Link>
        </li>
      )}
    </div>
  );
}
