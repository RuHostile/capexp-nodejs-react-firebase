import React, { useState, useEffect } from "react";
import NavBar from "./nav-bar.component";
import { db } from "../firebase";
import { set, ref, push, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

export default function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [amountSpent, setAmountSpent] = useState("");
  const [fixedAssetAccount, setFixedAssetAccount] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [vendors, setVendors] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  //write a new project to the project tabble
  function writeProject() {
    if (!projectName) {
      setError("Please Enter a project name.") 
      return;
    }
    const userId = user.uid;
    const projectId = ""
    const projectListRef = ref(db, 'projects');
    const newProjectRef = push(projectListRef);
    set(newProjectRef, {
      id: newProjectRef.key,
      projectname: projectName,
      projectdescription: description,
      projectdepartment: department,
      projectamountspent: amountSpent,
      projectuserid: userId,
    });
    setSubmitted(true);
  }

  function newProject() { 
    setSubmitted(null);
    setProjectName("");
    setDescription("");
    setDepartment("");
    setAmountSpent("");
    setError("");
  }

  function saveProject() {
    var data = {
      projectName: projectName,
      description: description,
      department: department,
      amountSpent: amountSpent,
    };
  }

  return (
    <div className="submit-form">
      <NavBar />
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProject}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              className="form-control"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              name="projectName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              name="department"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amountspent">Amount Spent</label>
            <input
              type="number"
              className="form-control"
              id="amountspent"
              required
              value={"0"}
              onChange={(e) => setAmountSpent(e.target.value)}
              name="amountspent"
            />
          </div>

          <button onClick={writeProject} className="btn btn-success">
            Submit
          </button>
         {error}
        </div>
        
      )}
    </div>
  );
}
