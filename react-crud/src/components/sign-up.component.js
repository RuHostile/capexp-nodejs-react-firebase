import Userfront from "@userfront/core";
import React from "react";
import { Link } from "react-router-dom";
import UserDataService from "../services/user.service";


// Initialize Userfront Core JS
Userfront.init("demo1234");

class Alert extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.message) return "";
    return <div id="alert">{this.props.message}</div>;
  }
}

// Define the Signup form component
export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      accountName: "",
      password: "",
      passwordVerify: "",
      alertMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  // Whenever an input changes value, change the corresponding state variable
  handleInputChange(event) {
    event.preventDefault();

    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  // Handle the form submission by calling Userfront.signup()
  handleSubmit(event) {
    sessionStorage.setItem("currentUser", this.state.email)
    event.preventDefault();
    // Reset the alert to empty
    this.setAlertMessage();
    //  Call Userfront.signup()
    Userfront.signup({
      method: "password",
      email: this.state.email,
      password: this.state.password,
      data: {
        accountName: this.state.accountName,
      },
    }).catch((error) => {
      this.setAlertMessage(error.message);
    });
    this.saveUser();
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }

  saveUser() {
    var data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    UserDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div class="d-flex justify-content-center">
        <Alert message={this.state.alertMessage} />
        <form onSubmit={this.handleSubmit}>
        <label>
            Email address
            <input
            className="form-control"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <br/>
          <label>
            Account name (custom field)
            <input
            className="form-control"
              name="accountName"
              type="text"
              value={this.state.accountName}
              onChange={this.handleInputChange}
            />
          </label>
          <br/>
          <label>
            Password
            <input
            className="form-control"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <br/>
          <label>
            Verify password
            <input
            className="form-control"
              name="passwordVerify"
              type="password"
              value={this.state.passwordVerify}
              onChange={this.handleInputChange}
            />
          </label>
          <br/>
          <button className="btn btn-success" type="submit">Sign up</button>
          <Link to={"/"} className="btn btn-outline-secondary">
          Click me to login in
        </Link>
        </form>
        
      </div>
    );
  }
}
