import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landingpage from "./components/landingpage.component";
import Login from "./components/login.component";
import Signup from "./components/signup.component";
import ListProjects from "./components/list-projects.component";
import OcrApi from "./components/ocrApi.component";
import AddProject from "./components/addProject.component";
import Project from "./components/project.component";
import Dashboard from "./components/dashboard.component";
import ListExpenses from "./components/list-expenses.component";
import AddExpense from "./components/addExpense.component";
import Expense from "./components/expense.component";
import ProjectAnalysis from "./components/project-analysis.component";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/project-list" element={<ListProjects/>} />
        <Route path="/ocrapi" element={<OcrApi/>}/>
        <Route path="/addProject" element={<AddProject/>}/>
        <Route path="/project/:id" element={<Project/>}/>
        <Route path="/list-expenses/:pid" element={<ListExpenses/>}/>
        <Route path="/addExpense/:pid" element={<AddExpense/>}/>
        <Route path="/expense/" element={<Expense/>}/>
        <Route path="/project-analysis" element={<ProjectAnalysis/>}/>
      </Routes>
    </BrowserRouter>
  );
};