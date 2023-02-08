import React, { Component } from "react";
import ProjectDataService from "../services/project.service";
import { withRouter } from "../common/with-router";

class Project extends Component {
  constructor(props) {
    super(props);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeCapexp = this.onChangeCapexp.bind(this);
    this.getProject = this.getProject.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);

    this.state = {
      currentProject: {
        id: null,
        projectName: "",
        description: "",
        department: "",
        capexp: "", 

        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProject(this.props.router.params.id);
  }

  onChangeProjectName(e) {
    const projectName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProject: {
          ...prevState.currentProject,
          projectName: projectName,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentProject: {
        ...prevState.currentProject,
        description: description,
      },
    }));
  }
  onChangeDepartment(e) {
    const department = e.target.value;

    this.setState((prevState) => ({
      currentProject: {
        ...prevState.currentProject,
        department: department,
      },
    }));
  }

  onChangeCapexp(e) {
   const capexp = e.target.value;

   this.setState((prevState) => ({
     currentProject: {
       ...prevState.currentProject,
       capexp: capexp,
     },
   }));
 }

  getProject(id) {
    ProjectDataService.get(id)
      .then((response) => {
        this.setState({
          currentProject: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentProject.id,
      projectName: this.state.currentProject.projectName,
      description: this.state.currentProject.description,
      department: this.state.currentProject.department,
      capexp: this.state.currentProject.capexp,

      published: status,
    };

    ProjectDataService.update(this.state.currentProject.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentProject: {
            ...prevState.currentProject,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateProject() {
    ProjectDataService.update(this.state.currentProject.id, this.state.currentProject)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The project was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteProject() {
    ProjectDataService.delete(this.state.currentProject.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate("/projects");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentProject } = this.state;

    return (
      <div>
        {currentProject ? (
          <div className="edit-form">
            <h4>Project</h4>
            <form>
              <div className="form-group">
                <label htmlFor="projectName">projectName</label>
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  value={currentProject.projectName}
                  onChange={this.onChangeProjectName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProject.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  value={currentProject.department}
                  onChange={this.onChangeDepartment}
                />
              </div>
              <div className="form-group">
                <label htmlFor="capexp">Capital Expenditure</label>
                <input
                  type="text"
                  className="form-control"
                  id="capexp"
                  value={currentProject.capexp}
                  onChange={this.onChangeCapexp}
                />
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
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="btn btn-danger"
              onClick={this.deleteProject}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.updateProject}
            >
              Update
            </button>
            <p>{this.state.message}</p>
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
}
export default withRouter(Project);
