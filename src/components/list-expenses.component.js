import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { ref, onValue, update, query, equalTo } from "firebase/database";
import AddExpense from "./addExpense.component";

export default function ListExpenses() {
  const [currentProject, setCurrentProject] = useState(
    JSON.parse(sessionStorage.getItem("currentProject"))
  );
  const [searchExpenseName, setSearchExpenseName] = useState("");
  const [searchExpenseList, setSearchExpenseList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [listExpenses, setListExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState("");
  const [currentIndex, setCurrentIndex] = useState("-1");
  const [totalSpent, setTotalSpent] = useState(
    currentProject.projectamountspent
  );

  const dbExpensesRef = ref(db, "expenses");

  useEffect(() => {
    retrieveExpenses();
    calculateTotal();
    if(searchExpenseName == ""){
      setSearching(false);
    }
  }, []);

  function retrieveExpenses() {
    //get all expenses with current project id
    onValue(dbExpensesRef, (snapshot) => {
      setListExpenses([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((expense) => {
          if (expense.expenseprojectid == currentProject.id) {
            setListExpenses((oldArray) => [...oldArray, expense]);
          }
        });
      }
    });
  }

  function calculateTotal() {
    onValue(dbExpensesRef, (snapshot) => {
      let newTotal = 0.0;
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((expense) => {
          if (expense.expenseprojectid == currentProject.id) {
            newTotal += parseFloat(expense.expenseamount);
          }
        });
        setTotalSpent(newTotal);
        update(ref(db, "/projects/" + currentProject.id), {
          projectamountspent: newTotal.toString(),
        });
      }
    });
  }

  // refresh the list when needed
  function refreshList() {
    retrieveExpenses();
    calculateTotal();
    setCurrentExpense("");
    setCurrentIndex("-1");
  }

  function setActiveExpense(expense, index) {
    sessionStorage.setItem("currentExpense", JSON.stringify(expense));
    setCurrentExpense(expense);
    setCurrentIndex(index);
  }

  function searchExpenseNameInExpenseTable() {
    setSearching(true);
    //search for expense name with
    setSearchExpenseList([]);
    listExpenses.forEach((expense) => {
      let eName = expense.expensename.toLowerCase();
      console.log(expense.expensename);
      if (eName.includes(searchExpenseName.toLowerCase())) {
        setSearchExpenseList((oldArray) => [...oldArray, expense]);
      }
    });
  }
  return (
    <div className="list row">
      <div className="col-md-8">
        <h4>Current Project: {currentProject.projectname}</h4>
        <h5>Total Spent: £{totalSpent}</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Expense Name"
            value={searchExpenseName}
            onChange={(e) => setSearchExpenseName(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={searchExpenseNameInExpenseTable}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Expenses List</h4>

        <ul className="list-group">
          {searching == true ? (
            <>
              {searchExpenseList &&
                searchExpenseList.map((expense, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveExpense(expense, index)}
                    key={index}
                  >
                    {expense.expensename}
                  </li>
                ))}
            </>
          ) : (
            <>
              {listExpenses &&
                listExpenses.map((expense, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveExpense(expense, index)}
                    key={index}
                  >
                    {expense.expensename}
                  </li>
                ))}
            </>
          )}
        </ul>

        <Link
          className="btn btn-outline-secondary"
          type="button"
          to={"/dashboard"}
        >
          Back
        </Link>
      </div>
      <div className="col-md-6">
        {currentExpense ? (
          <div>
            <h4>Expense Details</h4>
            <div>
              <label>
                <strong>Expense Name:</strong>
              </label>{" "}
              {currentExpense.expensename}
            </div>
            <div>
              <label>
                <strong>Date:</strong>
              </label>{" "}
              {currentExpense.expensedate}
            </div>
            <div>
              <label>
                <strong>Amount:</strong>
              </label>
              {" \u00A3"}
              {currentExpense.expenseamount
                ? currentExpense.expenseamount
                : "0"}
            </div>

            <Link
              to={"/expense/"}
              type="button"
              className="btn btn-outline-warning"
            >
              Edit Expense
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Expense...</p>
          </div>
        )}
      </div>
      <div className="col-md-3">
        <h4>Add Expense</h4>
        <AddExpense />
      </div>
    </div>
  );
}
