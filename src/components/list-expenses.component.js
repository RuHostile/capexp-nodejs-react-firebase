import "../index.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { ref, onValue, update, query, equalTo } from "firebase/database";
import AddExpense from "./addExpense.component";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import Expense from "./expense.component";
import NavBar from "./nav-bar.component";

export default function ListExpenses() {
  const [currentProject, setCurrentProject] = useState(
    JSON.parse(sessionStorage.getItem("currentProject"))
  );
  const [searchExpenseName, setSearchExpenseName] = useState("");
  const [searchExpenseList, setSearchExpenseList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [listExpenses, setListExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");
  const [totalSpent, setTotalSpent] = useState(
    currentProject.projectamountspent
  );
  const [budgetStatus, setBudgetStatus] = useState(
    currentProject.projectbudgetstatus
  );
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const closeAdd = () => setModalOpenAdd(false);
  const openAdd = () => setModalOpenAdd(true);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const closeEdit = () => setModalOpenEdit(false);
  const openEdit = () => setModalOpenEdit(true);

  useEffect(() => {
    retrieveExpenses();
    calculateTotal();
    if (searchExpenseName == "") {
      setSearching(false);
    }
  }, []);

  const dbExpensesRef = ref(db, "expenses");

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
      let newTotal = parseFloat(0);
      let newBudgetStatus = "";
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((expense) => {
          let number = parseFloat(expense.expenseamount);
          if (expense.expenseprojectid == currentProject.id) {
            newTotal = newTotal + number;
          }
        });
        setTotalSpent(parseFloat(newTotal).toFixed(2));
        if (
          parseFloat(totalSpent) <
          parseFloat(currentProject.projectestimatedcost)
        ) {
          newBudgetStatus = "Under budget";
        } else if (
          parseFloat(totalSpent) >
          parseFloat(currentProject.projectestimatedcost)
        ) {
          newBudgetStatus = "Over budget";
        } else {
          newBudgetStatus = "On budget";
        }
        setBudgetStatus(newBudgetStatus);

        update(ref(db, "/projects/" + currentProject.id), {
          projectbudgetstatus: newBudgetStatus,
          projectamountspent: parseFloat(newTotal).toFixed(2),
        });
      }
    });
  }

  // refresh the list when needed
  function refreshList() {
    retrieveExpenses();
    calculateTotal();
    setCurrentExpense("");
    setCurrentIndex("");
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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <div className="list-expenses-container" style={{ backgroundColor: "" }}>
      <NavBar className="row" />
      <div className="d-flex">
        <div className="col-6 p-2" style={{ color: "" }}>
          <h4 className="display-4"> {currentProject.projectname}</h4>
          <h5>Total Spent: {formatter.format(totalSpent)}</h5>
          <h5>
            Budget: {formatter.format(currentProject.projectestimatedcost)}
          </h5>
          <div className="">
            {currentExpense ? (
              <div
                className="p-2  rounded"
                style={{
                  backgroundColor: "#DCDCDC",
                  border: "1px solid black",
                }}
              >
                <h3 className="display-6">Expense Details</h3>
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
                    <strong>Amount: </strong>
                  </label>{" "}
                  {formatter.format(currentExpense.expenseamount)}
                </div>

                <Link
                  // to={"/expense/"}
                  type="button"
                  className="btn btn-warning"
                  onClick={() => (modalOpenEdit ? closeEdit() : openEdit())}
                >
                  Edit Expense
                </Link>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => (
                    modalOpenAdd ? closeAdd() : openAdd(), setActiveExpense("")
                  )}
                >
                  Add Expense
                </button>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Expense...</p>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => (
                    modalOpenAdd ? closeAdd() : openAdd(), setActiveExpense("")
                  )}
                >
                  Add Expense
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="col-5">
          <h4 className="display-6">Search Expense</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Expense Name"
            value={searchExpenseName}
            onChange={(e) => setSearchExpenseName(e.target.value)}
          />
          <div className="col-10">
            <h4 className="display-6">Expenses List</h4>

            {searching == true ? (
              <motion.ul
                className=""
                style={{ listStyleType: "none", padding: 0, margin: 0 }}
              >
                {searchExpenseList &&
                  searchExpenseList.map((expense, index) => (
                    <motion.li
                      animate={{
                        backgroundColor:
                          index === currentIndex ? "aqua" : "white",
                      }}
                      className={""}
                      style={{
                        border: "1px solid #ddd",
                        marginTop: "-1px",
                        padding: "12px",
                      }}
                      onClick={() => setActiveExpense(expense, index)}
                      key={index}
                    >
                      {expense.expensename}
                    </motion.li>
                  ))}
              </motion.ul>
            ) : (
              <motion.ul
                className=""
                style={{ listStyleType: "none", padding: 0, margin: 0 }}
              >
                {listExpenses &&
                  listExpenses.map((expense, index) => (
                    <motion.li
                      animate={{
                        backgroundColor:
                          index === currentIndex ? "aqua" : "white",
                      }}
                      className={
                        "group-item-container " +
                        (index === currentIndex ? "active" : "")
                      }
                      style={{
                        border: "1px solid #ddd",
                        marginTop: "-1px",
                        padding: "12px",
                      }}
                      onClick={() => setActiveExpense(expense, index)}
                      key={index}
                    >
                      <div className="d-flex container">
                        <div className="col-4"> {expense.expensename}</div>
                        <div className="col-6">{expense.expensevendor}</div>
                        <div className="col-1">£{expense.expenseamount}</div>
                      </div>
                    </motion.li>
                  ))}
              </motion.ul>
            )}

            <Link
              className="btn btn-outline-secondary"
              type="button"
              to={"/project-list"}
            >
              Back
            </Link>
          </div>
        </div>
        <div className="col-1">
          <h4 className="display-6">
            <br />
          </h4>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={searchExpenseNameInExpenseTable}
          >
            Search
          </button>
        </div>
      </div>

      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {modalOpenAdd && (
          <Modal
            modalOpen={modalOpenAdd}
            handleClose={closeAdd}
            text={
              <AddExpense
                pName={""}
                eAmount={""}
                eDate={""}
                eDescription={""}
              />
            }
          />
        )}
        {modalOpenEdit && (
          <Modal
            modalOpen={modalOpenEdit}
            handleClose={closeEdit}
            text={<Expense />}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
