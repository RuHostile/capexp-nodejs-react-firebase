import React, { Component } from "react";
import ProjectDataService from "../services/project.service";

export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeCapexp = this.onChangeCapexp.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.newProject = this.newProject.bind(this);

    this.state = {
      id: null,
      projectName: "",
      description: "",
      department: "", 
      capexp: "",

      submitted: false
    };
  }

  onChangeProjectName(e) {
   this.setState({
      projectName: e.target.value
   });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDepartment(e) {
   this.setState({
     department: e.target.value
   });
 }

 onChangeCapexp(e) {
   this.setState({
     capexp: e.target.value
   });
 }

 

  saveProject() {
    var data = {
      projectName: this.state.projectName,
      description: this.state.description,
      department: this.state.department,
      capexp: this.state.capexp
    };

    ProjectDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          projectName: response.data.projectName,
          description: response.data.description,
          department: response.data.department,
          capexp: response.data.capexp,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProject() {
    this.setState({
      id: null,
      projectName: "",
      description: "",
      department: "",
      capexp: "",

      submitted: false
    });
  }

  render() {
      return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newProject}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  
                  value={this.state.projectName}
                  onChange={this.onChangeProjectName}
                  name="projectName"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="department"
                  className="form-control"
                  id="department"
                  required
                  value={this.state.department}
                  onChange={this.onChangeDepartment}
                  name="department"
                />
              </div>

              <div className="form-group">
                <label htmlFor="capexp">Capital Expenditure</label>
                <input
                  type="capexp"
                  className="form-control"
                  id="capexp"
                  required
                  value={this.state.capexp}
                  onChange={this.onChangeCapexp}
                  name="capexp"
                />
              </div>
  
              <button onClick={this.saveProject} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
  }
