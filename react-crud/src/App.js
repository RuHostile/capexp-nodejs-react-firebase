import React, { Component } from "react";
import { Link, Route, Routes,  } from "react-router-dom";
import User from "./components/user.component";
import UsersList from "./components/users-list.component";
import AddUser from "./components/add-user.component";
import Project from "./components/project.component";
import ProjectList from "./components/projects-list.component";
import AddProject from "./components/add-project.component";
// import Expense from "./components/expense.component";
// import ExpenseList from "./components/expenses-list.component";
// import AddExpense from "./components/add-expense.component";


import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            CapExp
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addUser"} className="nav-link">
                New User
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/projects"} className="nav-link">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addProject"} className="nav-link">
                New Project
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/expenses"} className="nav-link">
                Expenses
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addExpense"} className="nav-link">
                New Expense
              </Link>
            </li>
          
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={"Landing Page"} />
            <Route path="/users" element={<UsersList/>} />
            <Route path="/addUser" element={<AddUser/>} />
            <Route path="/users/:id" element={<User/>} />

            <Route path="/projects" element={<ProjectList/>} />
            <Route path="/addProject" element={<AddProject/>} />
            <Route path="/projects/:id" element={<Project/>} />

            <Route path="/expenses" element={"expenses list"} />
            <Route path="/addExpense" element={"add expense"} />
            <Route path="/expenses/:id" element={"expense details"} />

          </Routes>
        </div>
      </div>
    );
  }
}

export default App;