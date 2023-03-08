import React, { Component } from "react";
import { Link, Route, Routes,  } from "react-router-dom";
import User from "./components/user.component";
import UsersList from "./components/users-list.component";
import AddUser from "./components/add-user.component";
import Project from "./components/project.component";
import ProjectList from "./components/projects-list.component";
import AddProject from "./components/add-project.component";
import Expense from "./components/expense.component";
import ExpenseList from "./components/expenses-list.component";
import AddExpense from "./components/add-expense.component";
import NavBar from "./components/nav-bar.component";


import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/login.component";
import SignupForm from "./components/sign-up.component";
import ExcelDump from "./components/excel-dump.component";
import TensorFlowOpticalCharacterRecognition from "./components/tensorflow.component";


class App extends Component {
  render() {
    return (
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/sign-up" element={<SignupForm/>} />
            <Route path="/users" element={<UsersList/>} />
            <Route path="/addUser" element={<AddUser/>} />
            <Route path="/users/:id" element={<User/>} />

            <Route path="/dashboard" element={<ProjectList/>} />
            <Route path="/addProject" element={<AddProject/>} />
            <Route path="/projects/:id" element={<Project/>} />

            <Route path="/expenses" element={<ExpenseList/>} />
            <Route path="/addExpense" element={<AddExpense/>} />
            <Route path="/expenses/:id" element={<Expense/>} />

            <Route path="/excel" element={<ExcelDump/>} />
            <Route path="/tfocr" element={<TensorFlowOpticalCharacterRecognition/>} />

          </Routes>
    );
  }
}

export default App;