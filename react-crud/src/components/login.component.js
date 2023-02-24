import React, { Component } from "react";
import { Link } from "react-router-dom";
import landingIMG from "../common/landingIMG.png";
import NavBar from "./nav-bar.component";
import Userfront from "@userfront/core";
import UserDataService from "../services/user.service";
Userfront.init("demo1234");

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  render() {
    if (!this.props.message) return "";
    return <div id="alert">{this.props.message}</div>;
  }
}

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: "",
      password: "",
      alertMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
  }

  loginCheck() {}

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Reset the alert to empty
    this.setAlertMessage();
    Userfront.login({
      method: "password",
      emailOrUsername: this.state.emailOrUsername,
      password: this.state.password,
    }).catch((error) => {
      this.setAlertMessage(error.message);
    });
    UserDataService.confirmUser(
      this.state.emailOrUsername,
      this.state.password
    )
      .then((response) => {
        this.setState({
          user: response.data,
        });
        console.log(response.data);
        sessionStorage.setItem("currentUser", response.data.email);
        sessionStorage.setItem("currentUserID", response.data.id);

      })
      .catch((e) => {
        console.log(e);
      });
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }

  render() {
    return (
      <div>
        <Alert message={this.state.alertMessage} />
        <div>
          <form onSubmit={this.handleSubmit} to={"/"}>
            <label>
              Email or username
              <input
                name="emailOrUsername"
                type="text"
                value={this.state.emailOrUsername}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
            <button type="submit" >
              Log in
            </button>
          </form>
        </div>
        <Link to={"/sign-up"} className="nav-link">
          Click me to sign up
        </Link>
      </div>
    );
  }
}
