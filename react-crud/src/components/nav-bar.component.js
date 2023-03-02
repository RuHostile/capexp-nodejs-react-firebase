import React, { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            CapExp
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addProject"} className="nav-link">
                New Project
              </Link>
            </li>
          </div>
        </nav>
      </div>
    );
  }
}
