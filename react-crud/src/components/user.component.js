import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { withRouter } from "../common/with-router";

class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        username: "",
        email: "",
        password: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getUser(this.props.router.params.id);
  }

  onChangeUsername(e) {
    const username = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          username: username,
        },
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        email: email,
      },
    }));
  }
  onChangePassword(e) {
    const password = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        password: password,
      },
    }));
  }

  getUser(id) {
    UserDataService.get(id)
      .then((response) => {
        this.setState({
          currentUser: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentUser.id,
      username: this.state.currentUser.username,
      email: this.state.currentUser.email,
      password: this.state.currentUser.password,
      published: status,
    };

    UserDataService.update(this.state.currentUser.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentUser: {
            ...prevState.currentUser,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(this.state.currentUser.id, this.state.currentUser)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteUser() {
    UserDataService.delete(this.state.currentUser.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate("/users");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentUser.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  value={currentUser.password}
                  onChange={this.onChangePassword}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentUser.published ? "Published" : "Pending"}
              </div>
            </form>
            {/*example of how to show and remove divs using condition checks*/}
            {currentUser.published ? (
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
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(User);
