import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./nav-bar.component";
import { db } from "../firebase";
import { ref, onValue, query, orderByChild, DataSnapshot, set } from "firebase/database";

export default function ListProjects() {
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectKeys, setProjectKeys] = useState([]);
  const [currentProject, setCurrentProject] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");
  const [searchProjectName, setSearchProjectName] = useState("");

  const dbProjectsRef = ref(db, "projects");

  //on start
  useEffect(() => {
    retrieveProjects();
    }, []);
 
  //read
  function retrieveProjects() {
    onValue(
      dbProjectsRef,
      (snapshot) => {
        setProjects([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((project) => {
            setProjects((oldArray) => [...oldArray, project])
          });
        }
      });
  }


  function getCapExp(pid, project) {
    //calculate capexpenditure and update project capexp
  }

  function refreshList() {
    retrieveProjects();
    setCurrentIndex("");
    setCurrentProject("");
  }

  function setActiveProject(project, index) {
    sessionStorage.setItem("currentProject", JSON.stringify(project));
    setCurrentProject(project);
    setCurrentIndex(index);
    getCapExp(project.id, project);
  }

  function removeAllProjects() { // remove this funciton 
    //delete all
  }

  const searchProjectNameInTable = async() => {
    //search by project name
  
 
  }

  return (
    <div className="list row">
      <NavBar />
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Project Name"
            value={searchProjectName}
            onChange={(e) => setSearchProjectName(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={searchProjectNameInTable}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Projects List</h4>

        <ul className="list-group">
          {projects &&
              projects.map((project, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveProject(project, index)}
                  key={index}
                >
                  {project.projectname}
                </li>
              ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentProject ? (
          <div>
            <h4>Project</h4>
            <label>Project ID:</label>
            <div>
              <label>
                <strong>Project Name:</strong>
              </label>{" "}
              {currentProject.projectname}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentProject.projectdescription}
            </div>
            <div>
              <label>
                <strong>Department:</strong>
              </label>{" "}
              {currentProject.projectdepartment}
            </div>
            <div>
              <label>
                <strong>Amount Spent:</strong>
              </label>{" "}
              {currentProject.projectamountspent ? ("£"+`${currentProject.projectamountspent}`) : "£0"}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentProject.published ? "Published" : "add a drop down"}
            </div>

            <Link
              to={"/project/" + currentProject.id}
              type="button"
              className="btn btn-outline-warning"
            >
              Edit Project
            </Link>
            <Link
              to={"/list-expenses/" + currentProject.id}
              type="button"
              className="btn btn-outline-primary"
            >
              View Expenses
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Project...</p>
          </div>
        )}
      </div>
    </div>
  );
}
