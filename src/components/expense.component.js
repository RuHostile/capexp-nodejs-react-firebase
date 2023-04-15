import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { ref, update, remove } from "firebase/database";

export default function Expense() {
  const [currentExpense, setCurrentExpense] = useState(
    JSON.parse(sessionStorage.getItem("currentExpense"))
  );
  const [currentUser, setCurrentUser] = useState(currentExpense.expenseuserid);
  const [currentProject, setCurrentProject] = useState(
    currentExpense.expenseprojectid
  );

  const [expenseName, setExpenseName] = useState(currentExpense.expensename);
  const [vendor, setVendor] = useState(currentExpense.expensevendor);
  const [date, setDate] = useState(currentExpense.expensedate);
  const [description, setDescription] = useState(
    currentExpense.expensedescription
  );
  const [quantity, setQuantity] = useState(currentExpense.expensequantity);
  const [amount, setAmount] = useState(currentExpense.expenseamount);
  const [total, setTotal] = useState(currentExpense.expensetotal);

  const [submitted, setSubmitted] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  function updateExpense() {
    //update expense
    console.log(currentExpense);

    update(ref(db, "/expenses/" + currentExpense.id),{
      expensename: expenseName,
      expensedescription: description,
      expensequantity: quantity,
      expensevendor: vendor,
      expensedate: date,
      expenseamount: amount,
     })
  }

  function deleteExpense() {
    //remove current expense
    remove(ref(db, "expenses/" + currentExpense.id));

  }

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
                defaultValue={currentExpense.expensename}
                onChange={(e) => setExpenseName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                defaultValue={currentExpense.expensedate}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                defaultValue={currentExpense.expenseamount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </form>
          <Link
            type="submit"
            className="btn btn-primary"
            onClick={updateExpense}
            to={"/list-expenses/"+currentExpense.expenseprojectid}
          >
            Update
          </Link>
          <Link className="btn btn-danger" onClick={deleteExpense} to={"/list-expenses/"+currentExpense.expenseprojectid}>
            Delete
          </Link>

          <Link
            className="btn btn-outline-secondary"
            type="button"
            to={"/list-expenses/"+currentExpense.expenseprojectid}
          >
            Cancel
          </Link>
          <p>{message}</p>
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
