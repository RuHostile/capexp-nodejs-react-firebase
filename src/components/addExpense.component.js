import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { ref, push, set, equalTo } from "firebase/database";

export default function AddExpense() {
  const [currentProject, setCurrentProject] = useState(
    JSON.parse(sessionStorage.getItem("currentProject"))
  );
  const [userId, setUserId] = useState("");

  const [expenseName, setExpenseName] = useState("");
  const [vendor, setVendor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [submitted, setSubmitted] = useState("");

  const [error, setError] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  function writeExpense() {
    if (!expenseName) {
      setError("Please Enter a project name.");
      return;
    }
    const userId = user.uid;
    const expenseId = "";
    const expenseListRef = ref(db, "expenses");
    const newExpenseRef = push(expenseListRef);
    set(newExpenseRef, {
      id: newExpenseRef.key,
      expensename: expenseName,
      expensedescription: description,
      expensequantity: quantity,
      expensevendor: vendor,
      expensedate: date,
      expenseamount: amount,
      expenseprojectid: currentProject.id,
      expenseuserid: userId,
    });
    setSubmitted(true);
  }

  function newExpense() {
    setSubmitted("");
    setExpenseName("");
    setDescription("");
    setVendor("");
    setDate("");
    setAmount("");
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newExpense}>
            Add another?
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="expenseName">Expense Name</label>
            <input
              type="text"
              className="form-control"
              id="expenseName"
              value={expenseName}
              onChange={(e) => {
                setExpenseName(e.target.value);
              }}
              name="expenseName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              name="date"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              required
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              name="amount"
            />
          </div>

          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={writeExpense}
          >
            Add Expense
          </button>
          {error}
        </div>
      )}
    </div>
  );
}
