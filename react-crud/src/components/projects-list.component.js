import React, { Component } from "react";
import ProjectDataService from "../services/project.service";
import ExpenseDataService from "../services/expense.service";
import { Link } from "react-router-dom";
import NavBar from "./nav-bar.component";

export default class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchProjectName = this.onChangeSearchProjectName.bind(this);
    this.retrieveProjects = this.retrieveProjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProject = this.setActiveProject.bind(this);
    this.removeAllProjects = this.removeAllProjects.bind(this);
    this.searchProjectName = this.searchProjectName.bind(this);

    this.state = {
      projects: [],
      currentProject: null,
      currentIndex: -1,
      searchProjectName: "",
    };
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  onChangeSearchProjectName(e) {
    const searchProjectName = e.target.value;

    this.setState({
      searchProjectName: searchProjectName,
    });
  }

  retrieveProjects() {
    ProjectDataService.getAll()
      .then((response) => {
        this.setState({
          projects: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getCapExp(pid, project) {
    ExpenseDataService.getCapExp(pid)
      .then((response) => {
        let capexp = 0;
        for (let i = 0; i < response.data.length; i++) {
          capexp += response.data[i].amount;
          
        }        
        project.capexp = capexp;
        console.log("capexp : ", capexp)
        console.log("p : ", project);

        ProjectDataService.update(pid, project);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProjects();
    this.setState({
      currentProject: null,
      currentIndex: -1,
    });
  }

  setActiveProject(project, index) {
    sessionStorage.setItem("currentProject", JSON.stringify(project.id));
    this.setState({
      currentProject: project,
      currentIndex: index,
    });
    this.getCapExp(project.id, project);
  }

  removeAllProjects() {
    ProjectDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchProjectName() {
    ProjectDataService.findByProjectName(this.state.searchProjectName)
      .then((response) => {
        this.setState({
          projects: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchProjectName, projects, currentProject, currentIndex } =
      this.state;

    return (
      <div className="list row">
        <NavBar />
        <h1>Current User: {sessionStorage.getItem("currentUser")}</h1>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Project Name"
              value={searchProjectName}
              onChange={this.onChangeSearchProjectName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchProjectName}
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
                  onClick={() => this.setActiveProject(project, index)}
                  key={index}
                >
                  {project.projectName}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProjects}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProject ? (
            <div>
              <h4>Project</h4>
              <div>
                <label>
                  <strong>Project Name:</strong>
                </label>{" "}
                {currentProject.projectName}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentProject.description}
              </div>
              <div>
                <label>
                  <strong>Department:</strong>
                </label>{" "}
                {currentProject.department}
              </div>
              <div>
                <label>
                  <strong>Captial Expenditure:</strong>
                </label>{" "}
                {currentProject.capexp}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentProject.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/projects/" + currentProject.id}
                type="button"
                className="btn btn-outline-warning"
              >
                Edit Project
              </Link>
              <Link to={"/expenses/"} type="button" className="btn btn-outline-primary">
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
}
