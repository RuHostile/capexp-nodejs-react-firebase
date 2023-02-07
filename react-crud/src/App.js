import React, { Component } from "react";
import { Link, Route, Routes,  } from "react-router-dom";
import User from "./components/user.component";
import UsersList from "./components/users-list.component";
import AddUser from "./components/add-user.component";
import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/users" className="navbar-brand">
            CapExp
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                New User
              </Link>
            </li>
            <li className="nav-item">
              <Link to={""} className="nav-link">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to={""} className="nav-link">
                New Project
              </Link>
            </li>
            <li className="nav-item">
              <Link to={""} className="nav-link">
                Expenses
              </Link>
            </li>
            <li className="nav-item">
              <Link to={""} className="nav-link">
                New Expense
              </Link>
            </li>
          
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<UsersList/>} />
            <Route path="/users" element={<UsersList/>} />
            <Route path="/add" element={<AddUser/>} />
            <Route path="/users/:id" element={<User/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;