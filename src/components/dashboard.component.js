import React from "react";
import { useState, useEffect, useRef } from "react";
import NavBar from "./nav-bar.component";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useForceUpdate } from "framer-motion";
import { PieChart } from "./PieChart.component";
// import { PieChart } from "./PieChart.component";

export default function Dashboard() {
  const dbProjectsRef = ref(db, "projects");

  const [dataStatusCount, setDataStatusCount] = useState([]);
  // its not working becasue data is not a useState

  useEffect(() => {
    getProjectStutus();
  }, []);

  function getProjectStutus() {
    onValue(dbProjectsRef, (snapshot) => {
      let completeCount = 0;
      let inProgresCount = 0;
      let notStartedCount = 0;
      let postponedCount = 0;
      let businessCaseCount = 0;
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((project) => {
          if (project.projectstatus == "Completed") {
            completeCount += 1;
          }
          if (project.projectstatus == "In progress") {
            inProgresCount += 1;
          }
          if (project.projectstatus == "Not started") {
            notStartedCount += 1;
          }
          if (project.projectstatus == "Postponed") {
            postponedCount += 1;
          }
          if (project.projectstatus == "Business case") {
            businessCaseCount += 1;
          }
        });
        setDataStatusCount([completeCount,inProgresCount, notStartedCount, postponedCount, businessCaseCount]);
      }
    });
  }

  return (
    <div className="dashboard-container">
      <NavBar className="row" />
      <div className="d-flex justify-content-md-center">
        <div className="col-4 m-3 p-1">
          <h4 className="display-4">Your Project Status</h4>
          <div>{dataStatusCount && <PieChart statusData={dataStatusCount}/>}</div>
        </div>
        <div className="col-3 m-3 p-1">

          <h2 className="display-4">Welcome to my Capital Expenditure Tracker web app!</h2>
          <p className="lead">Track and manage your company's expenses effortlessly with my user-friendly platform. Enjoy real-time updates, customizable categories, and secure cloud storage. </p>
        </div>
      </div>
    </div>
  );
}
