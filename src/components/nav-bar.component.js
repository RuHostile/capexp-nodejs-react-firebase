import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import AuthDetatils from "./AuthDetatils.component";

function NavBar() {
  
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand">
          CapExp
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/landingpage"} className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addProject"} className="nav-link">
              New Project
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/ocrapi"} className="nav-link" variant="primary">
              OCRAPI
            </Link>
          </li>
          <li className="nav-item">
            <AuthDetatils />
          </li>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
