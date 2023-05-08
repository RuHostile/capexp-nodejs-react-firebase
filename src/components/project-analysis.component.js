import "../index.css";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../firebase";
import NavBar from "./nav-bar.component";
import LineChart from "./LineChart.component";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
// import { Data } from "./utils/Data.util";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { BarChart } from "./BarChart.component";



Chart.register(CategoryScale);

export default function ProjectAnalysis() {
  const [currentProject] = useState(
    JSON.parse(sessionStorage.getItem("currentProject"))
  );

  const [showChart, setShowChart] = useState(false);
  const [progress] = useState((parseFloat(currentProject.projectamountspent)/parseFloat(currentProject.projectestimatedcost))*100)
 let Data = [
   {
     id: 1,
     name: "Estimated Cost",
     amount: currentProject.projectestimatedcost,
     userLost: 823
   },
   {
     id: 2,
     name: "Actual Spend",
     amount: currentProject.projectamountspent,
     userLost: 345
   }
 ];
   const [cData, setCData] = useState([]);
   const [chartData, setChartData] = useState({
   labels: Data.map((data) => data.name), 
   datasets: [
     {
       label: "Users Gained ",
       data: Data.map((data) => data.amount),
       backgroundColor: [
         "#f3ba2f",
         "#2a71d0"
       ],
       borderColor: "black",
       borderWidth: 1
     }
   ]
  });


  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });

  const toggleShowChart = () => {
   setShowChart(!showChart)
  }

 

  return (
    <div className="project-analysis-container">
      <NavBar className="row" />
      <div className="d-flex p-5">
        <div className="col-4" style={{ textAlign: "", backgroundColor: "" }}>
          <div>
            <h2 className="display-4">{currentProject.projectname}</h2>
          </div>
          <div>
            <p className="lead">
              <dt>Assigned to:</dt> {currentProject.projectassignedto}
            </p>
          </div>
          <div>
            <dt>Budget</dt>
            <dd>
              <strong className="display-6">
                {formatter.format(currentProject.projectamountspent)}
              </strong>{" "}
              out of {formatter.format(currentProject.projectestimatedcost)}
            </dd>
            <ProgressBar animated now={progress} variant={(progress > 100 ? "danger" : "primary")}/>
          </div>
          <div>
            <strong>Summary</strong>
            <p>{currentProject.projectsummary}</p>
          </div>
        </div>
        <div
          className="col-8"
          style={{
            textAlign: "",
            alignItems: "",
            backgroundColor: "",
          }}
        >
          <div className="m-3 p-3 d-flex rounded" style={{ backgroundColor: "#DCDCDC" }}>
          <div className="col-4">
              <div className="">
               <p className="lead">ID</p>
               <strong>{currentProject.id}</strong>
              </div>
              <div className="mt-4">
               <p className="lead">Department</p>
               <strong>{currentProject.projectdepartment}</strong>
              </div>
              <div className="mt-4">
              <p className="lead">Budget status</p>
               <strong>{currentProject.projectbudgetstatus}</strong>
              </div>
            </div>
            <div className="col-4">
              <div className="">
              <p className="lead">Starting date</p>
               <strong>{currentProject.projectstartdate}</strong>
              </div>
              <div className="mt-4">
              <p className="lead">Fixed asset account</p>
               <strong>{currentProject.projectfixedassetaccount}</strong>
              </div>
              <div className="mt-4">
              <p className="lead">Actual spend</p>
               <strong>{formatter.format(currentProject.projectamountspent)}</strong>
              </div>
            </div>
            <div className="col-4">
              <div className="">
              <p className="lead">Description</p>
               <strong>{currentProject.projectdescription}</strong>
              </div>
              <div className="mt-4">
              <p className="lead">Project status</p>
               <strong>{currentProject.projectstatus}</strong>
              </div>
              <div className="mt-4">
              <p className="lead">Estimated cost</p>
               <strong>{formatter.format(currentProject.projectestimatedcost)}</strong>
              </div>
            </div>
          </div>
          <div className="m-3 rounded" style={{ backgroundColor: "#DCDCDC", textAlign:"center" }}>
            <h4 className="display-6">Chart</h4>
            <button onClick={toggleShowChart }>Open chart</button>
            {showChart && (<BarChart chartData={chartData}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}
