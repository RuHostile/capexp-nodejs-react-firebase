import React from "react";
import { useState, useEffect, useRef } from "react";
import NavBar from "./nav-bar.component";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useForceUpdate } from "framer-motion";
import PieChart from "./PieChart.component";

Chart.register(CategoryScale);

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [notStarted, setNotStarted] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [complete, setComplete] = useState(0);
  const [postponed, setPostponed] = useState(0);
  const [businessCase, setBusinessCase] = useState(0);
  const dbProjectsRef = ref(db, "projects");
  let Data = [
    {
      id: 1,
      name: "Competed",
      count: complete,
    },
    {
      id: 2,
      name: "In progress",
      count: inProgress,
    },
    {
      id: 3,
      name: "Not started",
      count: notStarted,
    },
    {
      id: 4,
      name: "Postponed",
      count: postponed,
    },
    {
      id: 5,
      name: "Business case",
      count: businessCase,
    },
  ];
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.name),
    datasets: [
      {
        label: "Project status",
        data: Data.map((data) => data.count),
        backgroundColor: [
          "#52D726",
          "#FFEC00",
          "#FF7300",
          "#FF0000",
          "#007ED6",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    getProjectStutus();
  }, []);

  function getProjectStutus() {
    onValue(dbProjectsRef, (snapshot) => {
      setProjects([]);
      const data = snapshot.val();
      if (data !== null) {
        let countNotStarted = 0;
        let countInProgress = 0;
        let countComplete = 0;
        let countPostponed = 0;
        let countBusinessCase = 0;
        Object.values(data).map((project) => {
          console.log(project.projectstatus);
          if (project.projectstatus == "Completed"){
            incComplete()
          }
         

          //  setProjects((oldArray) => [...oldArray, project]);
        });
        setNotStarted(countNotStarted);
        setInProgress(countInProgress);
        setComplete(countComplete);
        setBusinessCase(countBusinessCase);
        setPostponed(countPostponed);
      }
    });
  }

  const incComplete = () =>{
   setComplete(complete + 1);
   console.log("PLEASE ADD" + complete)
  }

  return (
    <div className="dashboard-container">
      <NavBar className="row" />
      <div className="d-flex">
        <div className="col-6 m-3 p-1">
          <h4 className="display-4">Project Status</h4>
          <div>
            <PieChart chartData={chartData} />
          </div>
          <button onClick={incComplete}>display chart</button>
        </div>
        <div className="col-6">right</div>
      </div>
    </div>
  );
}
