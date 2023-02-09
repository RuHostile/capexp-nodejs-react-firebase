import React, { Component } from "react";
import ExpenseDataService from "../services/expense.service";
import { Link } from "react-router-dom";

export default class ExpensesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchExpenseName = this.onChangeSearchExpenseName.bind(this);
    this.retrieveExpenses = this.retrieveExpenses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveExpense = this.setActiveExpense.bind(this);
    this.removeAllExpenses = this.removeAllExpenses.bind(this);
    this.searchExpenseName = this.searchExpenseName.bind(this);

    this.state = {
      expenses: [],
      currentExpense: null,
      currentIndex: -1,
      searchExpenseName: "",
    };
  }

  componentDidMount() {
    this.retrieveExpenses();
  }

  onChangeSearchExpenseName(e) {
    const searchExpenseName = e.target.value;

    this.setState({
      searchExpenseName: searchExpenseName,
    });
  }

  retrieveExpenses() {
    ExpenseDataService.getAll()
      .then((response) => {
        this.setState({
          expenses: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveExpenses();
    this.setState({
      currentExpense: null,
      currentIndex: -1,
    });
  }

  setActiveExpense(expense, index) {
    this.setState({
      currentExpense: expense,
      currentIndex: index,
    });
  }

  removeAllExpenses() {
    ExpenseDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchExpenseName() {
    ExpenseDataService.findByExpenseName(this.state.searchExpenseName)
      .then((response) => {
        this.setState({
          expenses: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchExpenseName, expenses, currentExpense, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Expense Name"
              value={searchExpenseName}
              onChange={this.onChangeSearchExpenseName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchExpenseName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Expenses List</h4>

          <ul className="list-group">
            {expenses &&
              expenses.map((expense, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveExpense(expense, index)}
                  key={index}
                >
                  {expense.expenseName}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllExpenses}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentExpense ? (
            <div>
              <h4>Expense</h4>
              <div>
                <label>
                  <strong>Expense Name:</strong>
                </label>{" "}
                {currentExpense.expenseName}
              </div>
              <div>
                <label>
                  <strong>Amount:</strong>
                </label>{" "}
                {currentExpense.amount}
              </div>
              <div>
                <label>
                  <strong>Project ID:</strong>
                </label>{" "}
                {currentExpense.projectID}
              </div>
              <div>
                <label>
                  <strong>User ID:</strong>
                </label>{" "}
                {currentExpense.userID}
              </div>
               
              <Link
                to={"/expenses/" + currentExpense.id}
                type="button"
                className="btn btn-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Expense...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
