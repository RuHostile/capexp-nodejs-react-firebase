import { db } from "../firebase";
import { update, remove, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import { Link, Navigate, Router } from "react-router-dom";

export default function Project() {
   const [currentProject, setCurrentProject] = useState(
    JSON.parse(sessionStorage.getItem("currentProject"))
  );
  const [project, setProject] = useState("");
  const [projectName, setProjectName] = useState(currentProject.projectname);
  const [description, setDescription] = useState(currentProject.projectdescription);
  const [department, setDepartment] = useState(currentProject.projectdepartment);
  const [amountSpent, setAmountSpent] = useState(currentProject.projectamountspent);
  const [message, setMessage] = useState("");

  function getProject(id) {
    //get project with id
  }

  function updatePublished(status) {
    //change punlished status
  }

  function updateProject() {
    //update project
    console.log(currentProject);
   update(ref(db, "/projects/" + currentProject.id),{
    projectname: projectName,
    projectdescription: description,
    projectdepartment: department,
    projectamountspent: amountSpent,
   })
    

  }

  //delete selected proejct
  function deleteProject() {
    remove(ref(db, "projects/" + currentProject.id));
  }

  return (
    <div>
      {currentProject ? (
        <div className="edit-form">
          <h4>Project</h4>
          <form>
            <div className="form-group">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                defaultValue={currentProject.projectname}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                defaultValue={currentProject.projectdescription}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                defaultValue={currentProject.projectdepartment}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="capexp">Amount Spent : £</label>
              {currentProject.projectamountspent
                ? currentProject.projectamountspent
                : "0"}
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentProject.published ? "Published" : "Pending"}
            </div>
          </form>
          {/*example of how to show and remove divs using condition checks*/}
          {currentProject.published ? (
            <button
              className="btn btn-warning"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <Link className="btn btn-warning" onClick={deleteProject} to={"/landingpage"}>
            Delete
          </Link>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={updateProject}
          >
            Update
          </button>
          <Link
            className="btn btn-outline-secondary"
            type="button"
            to={"/landingPage"}
          >
            Back
          </Link>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Project...</p>
        </div>
      )}
    </div>
  );
}
