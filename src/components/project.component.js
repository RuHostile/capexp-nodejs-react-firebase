import { db } from "../firebase";
import { update, remove, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import { Link, Router } from "react-router-dom";

export default function Project() {
  const [submitted, setSubmitted] = useState("");
  const [currentProject, setCurrentProject] = useState(
    JSON.parse(sessionStorage.getItem("currentProject"))
  );
  const [projectName, setProjectName] = useState(currentProject.projectname);
  const [description, setDescription] = useState(
    currentProject.projectdescription
  );
  const [summary, setSummary] = useState(currentProject.projectsummary);
  const [department, setDepartment] = useState(
    currentProject.projectdepartment
  );
  const [fixedAssetAccount, setFixedAssetAccount] = useState(
    currentProject.projectfixedassetaccount
  );
  const [assignedTo, setAssignedTo] = useState(
    currentProject.projectassignedto
  );
  const [startDate, setStartDate] = useState(currentProject.projectstartdate);
  const [status, setStatus] = useState(currentProject.projectstatus);
  const [estimatedCost, setEstimatedCost] = useState(
    currentProject.projectestimatedcost
  );
  const [message, setMessage] = useState("");
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

  function getProject(id) {
    //get project with id
  }

  function updatePublished(state) {
    //change punlished status
  }

  const updateProject = (event) => {
    event.preventDefault();
    if (!projectName) {
      setMessage("Please Enter a project name.");
      return;
    }
    if (!department || department == "Choose") {
      setMessage("Please choose a department.");
      return;
    }
    if (!fixedAssetAccount || fixedAssetAccount == "Choose...") {
      setMessage("Please choose a fixed asset account.");
      return;
    }
    if (!status || status == "Choose...") {
      setMessage("Please choose a status.");
      return;
    }
    if (!startDate) {
      setMessage("Please enter at start date.");
      return;
    }
    //update project
    update(ref(db, "/projects/" + currentProject.id), {
      projectname: projectName,
      projectdescription: description,
      projectdepartment: department,
      projectfixedassetaccount: fixedAssetAccount,
      projectassignedto: assignedTo,
      projectstartdate: startDate,
      projectstatus: status,
      projectsummary: summary,
      projectestimatedcost: estimatedCost,
    });
    setSubmitted("Updated");
  };

  //delete selected proejct
  function deleteProject() {
    remove(ref(db, "projects/" + currentProject.id));
    setSubmitted("Deleted");
  }

  function handleSubmit() {
    setCurrentProject("")
  }

  function setSelectItem(X) {
    return <option>{X}</option>;
  }

  return (
    <div>
      {submitted ? (
        <div>
          <h4 style={{color: "white"}}>You {submitted} the project successfully!</h4>
        </div>
      ) : (
        <div>
          {currentProject ? (
            <div className="edit-form" style={{ color: "#EEEEEE" }}>
              <h3 style={{ color: "#EEEEEE" }}>Project details</h3>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label className="form-label">Project name</label>
                  <input
                    type="text"
                    defaultValue={currentProject.projectname}
                    className="form-control"
                    onChange={(e) => {
                      setProjectName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Department</label>
                  <select
                    type="text"
                    defaultValue={currentProject.projectdepartment}
                    className="form-select"
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
                    defaultValue={currentProject.projectfixedassetaccount}
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
                    type="text"
                    defaultValue={currentProject.projectassignedto}
                    className="form-select"
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
                    defaultValue={currentProject.projectstartdate}
                    className="form-control"
                    onChange={(e) => {
                      setStartDate(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Estimated cost</label>
                  <input
                    type="number"
                    min="0.01"
                    step="any"
                    defaultValue={currentProject.projectestimatedcost}
                    className="form-control"
                    onChange={(e) => {
                      setEstimatedCost(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    defaultValue={currentProject.projectdescription}
                    className="form-control"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select
                    type="text"
                    defaultValue={currentProject.projectstatus}
                    className="form-select"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    {statusData.map(setSelectItem)}
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="">Amount Spent : £</label>
                  {currentProject.projectamountspent
                    ? currentProject.projectamountspent
                    : "0"}
                  <br></br>
                  <label htmlFor="">Project user ID : </label>
                  {currentProject.projectuserid}
                  <br></br>
                </div>

                <div className="col-md-12">
                  <label className="form-label">Summary</label>
                  <textarea
                    type="text"
                    defaultValue={currentProject.projectsummary}
                    className="form-control"
                    onChange={(e) => {
                      setSummary(e.target.value);
                    }}
                  ></textarea>
                </div>

                <div className="col-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={updateProject}
                  >
                    Update project
                  </button>
                </div>
                <div className="col-3">
                  <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={deleteProject}
                  >
                    Delete project
                  </button>
                </div>
                {message}
              </form>
              <p>{message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Project...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
