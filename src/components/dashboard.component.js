import "../index.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./nav-bar.component";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { db } from "../firebase";
import {
  ref,
  onValue,
  query,
  orderByChild,
  DataSnapshot,
  set,
} from "firebase/database";
import Project from "./project.component";

export default function ListProjects() {
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectKeys, setProjectKeys] = useState([]);
  const [currentProject, setCurrentProject] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");
  const [searchProjectName, setSearchProjectName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const dbProjectsRef = ref(db, "projects");

  //on start
  useEffect(() => {
    retrieveProjects();
  }, []);

  //read
  function retrieveProjects() {
    onValue(dbProjectsRef, (snapshot) => {
      setProjects([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((project) => {
          setProjects((oldArray) => [...oldArray, project]);
        });
      }
    });
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
  }


  return (
    <div
      className=" dashboard-container"
      style={{ backgroundColor: "#1A5F7A" }}
    >
      <NavBar className="row" />
      <div className="d-flex">
        <div className="p-2 col-7" style={{ backgroundColor: "#159895" }}>
          <h4>Projects List</h4>

          <ul className="" style={{listStyleType:"none", padding:0, margin:0}}>
            {projects &&
              projects.map((project, index) => (
                <li
                  className={
                    "group-item-container" +
                    (index === currentIndex ? "active" : "")
                  }
                  style={{border: "1px solid #ddd",
                  marginTop: "-1px", 
                  padding: "12px"}}
                  onClick={() => setActiveProject(project, index)}
                  key={index}
                >
                  {project.projectname}
                </li>
              ))}
          </ul>
        </div>
        <div className="p-2 col-5" style={{ backgroundColor: "#57C5B6" }}>
          {currentProject ? (
            <div>
              <h4>Project details</h4>
              <label>
                <strong>
                Project ID:{" "}
                </strong>
                {currentProject.id}
              </label>
              <div>
                <label>
                  <strong>Project Name:</strong>
                </label>{" "}
                {currentProject.projectname}
              </div>
              <div>
                <label>
                  <strong>Date:</strong>
                </label>{" "}
                {currentProject.projectstartdate}
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
                  <strong>Assigned to:</strong>
                </label>{" "}
                {currentProject.projectassignedto}
              </div>
              <div>
                <label>
                  <strong>Fixed asset account:</strong>
                </label>{" "}
                {currentProject.projectfixedassetaccount}
              </div>
              <div>
                <label>
                  <strong>Estimated cost:</strong>
                </label>{" "}
                {currentProject.projectestimatedcost
                  ? "£" + `${currentProject.projectestimatedcost}`
                  : "£0"}
              </div>
              <div>
                <label>
                  <strong>Amount Spent:</strong>
                </label>{" "}
                {currentProject.projectamountspent
                  ? "£" + `${currentProject.projectamountspent}`
                  : "£0"}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentProject.projectstatus ? currentProject.projectstatus : "add a drop down"}
              </div>

              <Link
                // to={"/project/" + currentProject.id}
                type="button"
                className="btn btn-outline-warning"
                onClick={() => (modalOpen ? close() : open())}

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
      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            handleClose={close}
            text={<Project/>}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
