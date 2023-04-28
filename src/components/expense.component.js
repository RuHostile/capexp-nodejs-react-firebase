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

  var vendorData = ["Choose...", "Amazon", "Marvel", "Home Depot", "Deere", "Kshipping", "Lowes", "Loom", "Depot", "Aveva", "Bob Builders", "Ford"]

  const updateExpense= (event) => {
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
    //update expense
    update(ref(db, "/expenses/" + currentExpense.id), {
      expensename: expenseName,
      expensedescription: description,
      expensevendor: vendor,
      expensedate: date,
      expenseamount: parseFloat(amount).toFixed(2),
    });
    setSubmitted("Updated")
  }

  function deleteExpense() {
    //remove current expense
    remove(ref(db, "expenses/" + currentExpense.id));
    setSubmitted("Deleted")
  }

  function setSelectItem(X) {
    return <option>{X}</option>;
  }

  function handleSubmit() {

  }

  return (
    <div> {submitted ? (<div>
      <div>
          <h4 style={{color: "white"}}>You {submitted} the project successfully!</h4>
        </div>
    </div>) : (
      
    <div style={{color:"white"}}>
      {currentExpense ? (
        <div className="edit-form">
          <h3>Expense details</h3>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label">Expense name</label>
              <input
                type="text"
                className="form-control"
                id="expenseName"
                defaultValue={currentExpense.expensename}
                onChange={(e) => setExpenseName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Vendor</label>
              <select
                type="text"
                className="form-control"
                defaultValue={currentExpense.expensevendor}
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
                  defaultValue={currentExpense.expensedescription}
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
                id="date"
                defaultValue={currentExpense.expensedate}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Amount</label>
              <input
                type="number"
                min="0.01" step="any"
                className="form-control"
                id="amount"
                defaultValue={currentExpense.expenseamount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="col-12 p-2">
                <button type="submit" className="btn btn-primary" onClick={updateExpense}>
                  Update expense
                </button> 
                <button type="submit" className="btn btn-danger" onClick={deleteExpense}>
                  Delete expense
                </button> 
                {error}
              </div>
          </form>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Expense...</p>
        </div>
      )}
    </div>
    )}
    </div>
  );
}
