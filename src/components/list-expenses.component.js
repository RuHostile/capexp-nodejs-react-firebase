import "../index.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { ref, onValue, update, query, equalTo } from "firebase/database";
import AddExpense from "./addExpense.component";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import Expense from "./expense.component";

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
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const closeAdd = () => setModalOpenAdd(false);
  const openAdd = () => setModalOpenAdd(true);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const closeEdit = () => setModalOpenEdit(false);
  const openEdit = () => setModalOpenEdit(true);

  const dbExpensesRef = ref(db, "expenses");

  useEffect(() => {
    retrieveExpenses();
    calculateTotal();
    if (searchExpenseName == "") {
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
        <h5>Total Spent: £{totalSpent ? totalSpent : 0}</h5>
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

        <ul  className= "" style={{listStyleType:"none", padding:0, margin:0}}>
          {searching == true ? (
            <>
              {searchExpenseList &&
                searchExpenseList.map((expense, index) => (
                  <li
                    className={
                      "group-item-container " +
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
                      "group-item-container " +
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
            <h3>Expense Details</h3>
            <div>
              <label>
                <strong>Expense Name:</strong>
              </label>{" "}
              {currentExpense.expensename}
            </div>
            <div>
              <label>
                <strong>Expense vendor:</strong>
              </label>{" "}
              {currentExpense.expensevendor}
            </div>
            <div>
              <label>
                <strong>Expense description:</strong>
              </label>{" "}
              {currentExpense.expensedescription}
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
              // to={"/expense/"}
              type="button"
              className="btn btn-outline-warning"
              onClick={() => (modalOpenEdit ? closeEdit() : openEdit())}
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

        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => (modalOpenAdd ? closeAdd() : openAdd())}
        >
          Add Expense
        </button>
      </div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {modalOpenAdd && (
          <Modal
            modalOpen={modalOpenAdd}
            handleClose={closeAdd}
            text={<AddExpense />}
          />
        )}
        {modalOpenEdit && (
          <Modal
            modalOpen={modalOpenEdit}
            handleClose={closeEdit}
            text={<Expense/>}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
