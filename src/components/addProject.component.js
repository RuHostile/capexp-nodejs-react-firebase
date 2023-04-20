import React, { useState, useEffect } from "react";
import NavBar from "./nav-bar.component";
import { db } from "../firebase";
import { set, ref, push, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import "../index.css";

export default function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  // const [amountSpent, setAmountSpent] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [fixedAssetAccount, setFixedAssetAccount] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  // const [vendors, setVendors] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState("");

  var departmentDate = [
    "Choose...",
    "Maintenance",
    "Facilities",
    "IT",
    "Finance",
    "Security",
  ];
  var fixedAssetAccountData = [
    "Choose...",
    "Equipment",
    "Buildings",
    "Leasehold and Structures",
    "Computer Software",
    "Motor vehicles",
    "Furniture and fixtures",
  ];
  var assignedToData = [
    "Choose...",
    "Sponge Bob",
    "Bugs Bunny",
    "Captain America",
    "Boss Hog",
    "Mickey mouse",
    "Daffy Duck",
    "Winnie Pooh",
    "Black Panther",
    "Green Arrow",
    "Bart Simpson",
    "Donald Duck",
    "Charlie Brown",
    "Batman",
    "Spider Man",
  ];
  var statusData = [
    "Choose...",
    "Not started",
    "In progress",
    "Completed",
    "Postponed",
    "Business case",
  ];

  const auth = getAuth();
  const user = auth.currentUser;

  //write a new project to the project tabble
  const writeProject = (event) => {
    event.preventDefault();
    if (!projectName) {
      setError("Please Enter a project name.");
      return;
    }
    if (!department || department == "Choose"){
      setError("Please choose a department.");
      return;
    }
    if (!fixedAssetAccount || fixedAssetAccount == "Choose..."){
      setError("Please choose a fixed asset account.");
      return;
    }
    if (!status || status == "Choose..."){
      setError("Please choose a status.");
      return;
    }
    if (!startDate) {
      setError("Please enter at start date.");
      return;
    }
    const userId = user.uid;
    const projectId = "";
    const projectListRef = ref(db, "projects");
    const newProjectRef = push(projectListRef);
    set(newProjectRef, {
      id: newProjectRef.key,
      projectname: projectName,
      projectdepartment: department,
      projectfixedassetaccount: fixedAssetAccount,
      projectassignedto: assignedTo,
      projectstartdate: startDate,
      projectstatus: status,
      projectestimatedcost: estimatedCost,
      projectdescription: description,
      projectuserid: userId,
    });
    setSubmitted(true);
  }

  function newProject() {
    setSubmitted(null);
    setProjectName("");
    setDepartment("");
    setFixedAssetAccount("");
    setAssignedTo("");
    setStartDate("");
    setEstimatedCost("");
    setDescription("");
    setError("");
  }

  function setSelectItem(X) {
    return <option>{X}</option>;
  }

  return (
    <div
      className=""
      style={{color:"white"}}
      
    >
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProject}>
            Add another project?
          </button>
        </div>
      ) : (
        <div className="p-2">
            <h3>New project</h3>
            <form className="row g-3" onSubmit={writeProject}>
              <div className="col-md-6">
                <label className="form-label">Project name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                ></input>
              </div>
              <div className="col-md-6">
                <label className="form-label">Department</label>
                <select
                  className="form-select"
                  type="text"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                >
                  {departmentDate.map(setSelectItem)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Fixed asset account</label>
                <select
                  type="text"
                  className="form-select"
                  onChange={(e) => {
                    setFixedAssetAccount(e.target.value);
                  }}
                >
                  {fixedAssetAccountData.map(setSelectItem)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Assigned to</label>
                <select
                  className="form-select"
                  type="text"
                  onChange={(e) => {
                    setAssignedTo(e.target.value);
                  }}
                >
                  {assignedToData.map(setSelectItem)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Start date</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                ></input>
              </div>
              <div className="col-md-6">
                <label className="form-label">Estimated cost</label>
                <input
                  className="form-control"
                  type="number"
                  min="0.01" step="any"
                  onChange={(e) => {
                    setEstimatedCost(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-12">
                <label for="" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6">
                <label for="" className="form-label">
                  Project status
                </label>
                <select
                  className="form-select"
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  {statusData.map(setSelectItem)}
                </select>
              </div>
              <div className="col-md-6">
                  <label>Amount spent : £</label>
                  {0}
                  <br></br>
                  <label>
                    Project user ID :
                  </label>
                  {user.uid}
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add new project
                </button> 
                {error}
              </div>
            </form>
        </div>
      )}
    </div>
  );
}
