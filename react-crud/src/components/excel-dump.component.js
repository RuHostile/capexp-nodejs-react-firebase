import React, { Component } from "react";
import ProjectDataService from "../services/project.service";
import NavBar from "./nav-bar.component";
import { ChangeEvent } from "react";

export default class AddProject extends Component {
  constructor(props) {
    super(props);
    this.setFile = this.setFile.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);

    this.state = {
      file: "",
    };
  }

  setFile(e) {
    if (e.target.files) {
      this.setState({
        file: e.target.files[0],
      });
    }
  }

  handleUploadClick() {
    if (!this.state.file) {
      return;
    }
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: this.state.file,
      headers: {
        "content-type": this.state.file.type,
        "content-length": `${this.state.file.size}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="submit-form">
        <NavBar />
        <input type="file" onChange={this.setFile} />

        <div>
          {this.state.file &&
            `${this.state.file.name} - ${this.state.file.type} - ${this.state.file.data}`}
            {console.log(this.state.file)}
        </div>

        <button onClick={this.handleUploadClick}>Upload</button>
      </div>
    );
  }
}
