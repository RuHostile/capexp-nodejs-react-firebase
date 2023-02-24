import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExpenseDataService from "../services/expense.service";

export default class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.onChangeExpenseName = this.onChangeExpenseName.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeProjectID = this.onChangeProjectID.bind(this);
    this.onChangeUserID = this.onChangeUserID.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.newExpense = this.newExpense.bind(this);

    this.state = {
      id: null,
      expenseName: "",
      amount: "",
      projectID: sessionStorage.getItem("currentProject"), 
      userID: sessionStorage.getItem("currentUserID"),

      submitted: false
    };
  }

  onChangeExpenseName(e) {
   this.setState({
      expenseName: e.target.value
   });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onChangeProjectID(e) {
   this.setState({
     projectID: e.target.value
   });
 }

 onChangeUserID(e) {
   this.setState({
     userID: e.target.value
   });
 }

 

  saveExpense() {
    var data = {
      expenseName: this.state.expenseName,
      amount: this.state.amount,
      projectID: this.state.projectID,
      userID: this.state.userID
    };

    ExpenseDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          expenseName: response.data.expenseName,
          amount: response.data.amount,
          projectID: response.data.projectID,
          userID: response.data.userID,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newExpense() {
    this.setState({
      id: null,
      expenseName: "",
      amount: "",
      projectID: "",
      userID: "",

      submitted: false
    });
  }

  render() {
      return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newExpense}>
                Add
              </button>
              <Link className="btn btn-outline-secondary"
                type="button" to={"/expenses"}>Back</Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="expenseName">Expense Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="expenseName"
                  
                  value={this.state.expenseName}
                  onChange={this.onChangeExpenseName}
                  name="expenseName"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  required
                  value={this.state.amount}
                  onChange={this.onChangeAmount}
                  name="amount"
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectID">ProjectID</label>
                <input
                  type="projectID"
                  className="form-control"
                  id="projectID"
                  required
                  value={this.state.projectID}
                  onChange={this.onChangeProjectID}
                  name="projectID"
                />
              </div>

              <div className="form-group">
                <label htmlFor="userID">UserID</label>
                <input
                  type="userID"
                  className="form-control"
                  id="userID"
                  required
                  value={this.state.userID}
                  onChange={this.onChangeUserID}
                  name="userID"
                />
              </div>
  
              <button onClick={this.saveExpense} className="btn btn-success">
                Submit
              </button>
              <Link className="btn btn-outline-secondary"
                type="button" to={"/expenses"}>Back</Link>
            </div>
          )}
        </div>
      );
    }
  }
