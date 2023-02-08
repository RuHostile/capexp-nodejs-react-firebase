import React, { Component } from "react";
import ExpenseDataService from "../services/expense.service";
import { withRouter } from "../common/with-router";

class Expense extends Component {
  constructor(props) {
    super(props);
    this.onChangeExpenseName = this.onChangeExpenseName.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeProjectID = this.onChangeProjectID.bind(this);
    this.onChangeUserID = this.onChangeUserID.bind(this);
    this.getExpense = this.getExpense.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);

    this.state = {
      currentExpense: {
        id: null,
        expenseName: "",
        amount: "",
        projectID: "",
        userID: "", 

        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getExpense(this.props.router.params.id);
  }

  onChangeExpenseName(e) {
    const expenseName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentExpense: {
          ...prevState.currentExpense,
          expenseName: expenseName,
        },
      };
    });
  }

  onChangeAmount(e) {
    const amount = e.target.value;

    this.setState((prevState) => ({
      currentExpense: {
        ...prevState.currentExpense,
        amount: amount,
      },
    }));
  }
  onChangeProjectID(e) {
    const projectID = e.target.value;

    this.setState((prevState) => ({
      currentExpense: {
        ...prevState.currentExpense,
        projectID: projectID,
      },
    }));
  }

  onChangeUserID(e) {
   const userID = e.target.value;

   this.setState((prevState) => ({
     currentExpense: {
       ...prevState.currentExpense,
       userID: userID,
     },
   }));
 }

  getExpense(id) {
    ExpenseDataService.get(id)
      .then((response) => {
        this.setState({
          currentExpense: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentExpense.id,
      expenseName: this.state.currentExpense.expenseName,
      amount: this.state.currentExpense.amount,
      projectID: this.state.currentExpense.projectID,
      userID: this.state.currentExpense.userID,

      published: status,
    };

    ExpenseDataService.update(this.state.currentExpense.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentExpense: {
            ...prevState.currentExpense,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateExpense() {
    ExpenseDataService.update(this.state.currentExpense.id, this.state.currentExpense)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The expense was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteExpense() {
    ExpenseDataService.delete(this.state.currentExpense.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate("/expenses");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentExpense } = this.state;

    return (
      <div>
        {currentExpense ? (
          <div className="edit-form">
            <h4>Expense</h4>
            <form>
              <div className="form-group">
                <label htmlFor="expenseName">Expense Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="expenseName"
                  value={currentExpense.expenseName}
                  onChange={this.onChangeExpenseName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  value={currentExpense.amount}
                  onChange={this.onChangeAmount}
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectID">ProjectID</label>
                <input
                  type="text"
                  className="form-control"
                  id="projectID"
                  value={currentExpense.projectID}
                  onChange={this.onChangeProjectID}
                />
              </div>
              <div className="form-group">
                <label htmlFor="userID">Capital Expenditure</label>
                <input
                  type="text"
                  className="form-control"
                  id="userID"
                  value={currentExpense.userID}
                  onChange={this.onChangeUserID}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentExpense.published ? "Published" : "Pending"}
              </div>
            </form>
            {/*example of how to show and remove divs using condition checks*/}
            {currentExpense.published ? (
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
              onClick={this.deleteExpense}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.updateExpense}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Expense...</p>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Expense);
