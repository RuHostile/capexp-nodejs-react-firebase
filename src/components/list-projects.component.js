import "../index.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./nav-bar.component";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from "./utils/Data.util";
import PieChart from "./PieChart.component";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import Project from "./project.component";

Chart.register(CategoryScale);
export default function ListProjects() {
  const [projects, setProjects] = useState([]);
  const [projectKeys, setProjectKeys] = useState([]);
  const [currentProject, setCurrentProject] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");
  const [searchProjectName, setSearchProjectName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [chartData, setChartData] = useState({});

  const dbProjectsRef = ref(db, "projects");

  //on start
  useEffect(() => {
    retrieveProjects();
  }, []);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <div
      className=" list-projects-container"
      style={{ backgroundColor: "" }}
    >
      <NavBar className="row" />
      <div className="d-flex">
        <div className="p-2 col-6" style={{ backgroundColor: "" }}>
          <h4 className="display-6">Projects List</h4>

          <motion.ul
            className=""
            style={{ listStyleType: "none", padding: 0, margin: 0 }}
          >
            {projects &&
              projects.map((project, index) => (
                <motion.li
                  animate={{
                    backgroundColor: index === currentIndex ? "#00a8e8" : "white",
                  }}
                  className={
                    "group-item-container" +
                    (index === currentIndex ? "active" : "")
                  }
                  style={{
                    border: "1px solid #ddd",
                    marginTop: "-1px",
                    padding: "12px",
                  }}
                  onClick={() => setActiveProject(project, index)}
                  key={index}
                >
                  <div className="d-flex container">
                    <div className="col-4">
                      <div className="">
                        <strong>{project.projectname}</strong>
                      </div>
                      <div className="">{project.projectstatus}</div>
                    </div>
                    <div className="col-7">
                      <div className="">
                        <strong>
                          Estimated Cost:{" "}
                          {formatter.format(project.projectestimatedcost)}
                        </strong>
                      </div>
                      <div className="">
                        Actual Spend:{"      "}
                        {formatter.format(project.projectamountspent)}
                      </div>
                    </div>
                    <div className="col-1">{project.projectbudgetstatus}</div>
                  </div>
                </motion.li>
              ))}
          </motion.ul>
        </div>
        <div className="p-2 m-3 col-5" style={{ backgroundColor: "" }}>
        <h4 className="display-6">Project Details</h4>
          {currentProject ? (
            <div className="p-2  rounded" style={{ backgroundColor: "#DCDCDC", border: "1px solid black" }}>
              <label>
                <strong>Project ID: </strong>
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
                  ? `${formatter.format(currentProject.projectestimatedcost)}`
                  : "£0.00"}
              </div>
              <div>
                <label>
                  <strong>Amount Spent:</strong>
                </label>{" "}
                {currentProject.projectamountspent
                  ? `${formatter.format(currentProject.projectamountspent)}`
                  : "£0.00"}
              </div>
              <div>
                <label>
                  <strong>{currentProject.projectbudgetstatus}</strong>
                </label>
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentProject.projectstatus
                  ? currentProject.projectstatus
                  : "add a drop down"}
              </div>

              <Link
                // to={"/project/" + currentProject.id}
                type="button"
                className="btn btn-warning"
                onClick={() => (modalOpen ? close() : open())}
              >
                Edit project
              </Link>
              <Link
                to={"/project-analysis"}
                type="button"
                className="btn btn-secondary"
              >
                Project analysis
              </Link>
              <Link
                to={"/list-expenses/" + currentProject.id}
                type="button"
                className="btn btn-primary"
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
          <Modal modalOpen={modalOpen} handleClose={close} text={<Project />} />
        )}
      </AnimatePresence>
    </div>
  );
}
