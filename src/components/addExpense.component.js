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
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState("");

  const [error, setError] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  var vendorData = ["Choose...", "Amazon", "Marvel", "Home Depot", "Deere", "Kshipping", "Lowes", "Loom", "Depot", "Aveva", "Bob Builders", "Ford"]

  const writeExpense = (event) => {
    event.preventDefault();
    if (!expenseName) {
      setError("Please Enter an expense name.");
      return;
    } 
    if (!vendor){
      setError("Please choose a vendor");
      return;
    }  
    if (!date) {
      setError("Please choose a date");
      return;
    }   
    if (amount <= 0.00){
      setError("Amount must be greate than 0.00");
      return;
    }
    if (!amount) {
      setError("Please Enter an amount")
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

  function setSelectItem(X) {
    return <option>{X}</option>;
  }

  return (
    <div className="" style={{color: "white"}}>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newExpense}>
            Add another?
          </button>
        </div>
      ) : (
        <div>
          <h3>Add expense</h3>
          <form className="row g-3" onSubmit={writeExpense}>
              <div className="col-md-6">
                <label className="form-label">Expense name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setExpenseName(e.target.value);
                  }}
                ></input>
              </div>
              <div className="col-md-6">
                <label className="form-label">Vendor</label>
                <select
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setVendor(e.target.value);
                  }}
                >
                  {vendorData.map(setSelectItem)}
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></input>
              </div>
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                ></input>
              </div>
              <div className="col-md-6">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  min="0.01" step="any"
                  className="form-control"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                ></input>
              </div>
              <div className="col-12 p-2">
                <button type="submit" className="btn btn-primary">
                  Add new expense
                </button> 
                {error}
              </div>
              </form>
        </div>
      )}
    </div>
  );
}
