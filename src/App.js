import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login.component";
import Signup from "./components/signup.component";
import ListProjects from "./components/landingpage.component";
import OcrApi from "./components/ocrApi.component";
import AddProject from "./components/addProject.component";
import Project from "./components/project.component";
import ListExpenses from "./components/list-expenses.component";
import AddExpense from "./components/addExpense.component";
import Expense from "./components/expense.component";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landingpage" element={<ListProjects/>} />
        <Route path="/ocrapi" element={<OcrApi/>}/>
        <Route path="/addProject" element={<AddProject/>}/>
        <Route path="/project/:id" element={<Project/>}/>
        <Route path="/list-expenses/:pid" element={<ListExpenses/>}/>
        <Route path="/addExpense/:pid" element={<AddExpense/>}/>
        <Route path="/expense/" element={<Expense/>}/>
      </Routes>
    </BrowserRouter>
  );
};