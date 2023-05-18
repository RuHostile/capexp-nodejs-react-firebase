import "../index.css";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import { ProgressBar } from "react-bootstrap";
import NavBar from "./nav-bar.component";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import AddExpense from "./addExpense.component";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

function OcrApi() {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");

  const [invoice, setInvoice] = useState("");
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [total, setTotal] = useState("");
  const [modalOpen, setModalOpen] = useState("");
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  const dbProjectsRef = ref(db, "projects");
  const [currentIndex, setCurrentIndex] = useState("");
  const [currentProject, setCurrentProject] = useState("");

  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  function onChangeProject(e) {
    setProject(e.target.value);
  }
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }
  function onChangeDate(e) {
    setDate(e.target.value);
  }
  function onChangeTotal(e) {
    setTotal(e.target.value);
  }



  function getProjects() {
    onValue(dbProjectsRef, (snapshot) => {
      setProjects(["Choose..."]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((project) => {
          setProjects((oldArray) => [
            ...oldArray,
            [project.projectname, ":", project.id],
          ]);
        });
      }
    });
  }

  useEffect(() => {
    getProjects();
  }, []);

  const textExtract = (text) => {
    let regExInvoice = /(?<=INVOICE # )\d+/g;
    let regExDescription = /(?<=DESCRIPTION AMOUNT)((.|\n)*)(?=TOTAL)/g;
    let regExProject = /(?<=Project #: )([^\s]+)/g;
    let regExDate = /(?<=date: )(\d+-\d+-\d+)/g;
    let regExTotal =
      /(?<=TOTAL[\s\s][\$\£]?)([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?/g;
    if (text.match(regExInvoice) != null) {
      setInvoice(text.match(regExInvoice)[0]);
    } else {
      setInvoice("Please Fill");
    }
    if (text.match(regExDescription) != null) {
      setDescription(text.match(regExDescription)[0]);
    } else {
      setDescription("Please Fill");
    }

    if (text.match(regExProject) != null) {
      setProject(text.match(regExProject)[0]);
    } else {
      setProject("Please Fill");
    }
    if (text.match(regExDate) != null) {
      setDate(text.match(regExDate)[0]);
    } else {
      setDate("Please Fill");
    }
    if (text.match(regExTotal) != null) {
      setTotal(text.match(regExTotal)[0]);
    } else {
      setTotal("Please Fill");
    }
  };

  const imageToText = () => {
    Tesseract.recognize(image, "eng", {
      logger: (m) => {
        console.log(m);
        setProgress(parseInt(m.progress * 100));
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        let confidence = result.confidence;
        let text = result.data.text;
        setText(text);
        textExtract(text);
      });
  };

  const publishInvoice = () => {
    sessionStorage.setItem("currentProject", JSON.stringify(project));
    sessionStorage.setItem("currentDescription", JSON.stringify(description));
    sessionStorage.setItem("currentDate", JSON.stringify(date));
    sessionStorage.setItem(
      "currentTotal",
      JSON.stringify(parseFloat(total.replace(/,/g, "")))
    );
  };

  function setSelectItem(X) {
    return <option>{X}</option>;
  }

  return (
    <div className="dashboard-container" style={{ backgroundColor: "" }}>
      <NavBar class="row" />

      <div className="d-flex m-3">
        <div className="col col-4">
          <h4 className="display-6">1. Uploaded Image</h4>
          <div
            className=" rounded m-1 p-1"
            style={{ backgroundColor: "#DCDCDC", border: "1px solid black" }}
          >
            <p className="lead">Choose an Image</p>
            <input type="file" onChange={handleChange} accept="image/*" />
            <br />
            <img src={image} style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </div>
        </div>

        <div className="col col-4">
          <h4 className="display-6 mr-3">2. Extracted Text</h4>{" "}
          <ProgressBar
            animated
            now={progress}
            variant={progress < 100 ? "primary" : "success"}
          />
          <div className="d-flex">
            <button
              onClick={imageToText}
              className="ml-2 btn btn-outline-secondary"
            >
              convert to text
            </button>
          </div>
          <div
            className="rounded m-1 p-1"
            style={{ backgroundColor: "#DCDCDC", border: "1px solid black" }}
          >
            <p className="lead">{text}</p>
          </div>
          <div>
            <h4 className="display-6 mr-3">3. Choose Project</h4>
            <select
              type="text"
              className="form-select"
              onChange={(e) => {
                setProject(e.target.value.match(":(.*)")[1]);
              }}
            >
              {projects.map(setSelectItem)}
            </select>
          </div>
        </div>

        <div class="col col-4">
          <h4 className="display-6">4. Check Data</h4>
          <ul
            className="rounded m-1 p-1"
            style={{
              backgroundColor: "#DCDCDC",
              border: "1px solid black",
              listStyleType: "none",
            }}
          >
            <li>
              <label>Invoice #:</label>
              <br />
              <input
                className="form-control"
                type="text"
                defaultValue={invoice}
              ></input>
            </li>
            <li>
              <label>Project #:</label>
              <br />
              <input
                className="form-control"
                type="text"
                defaultValue={project}
                onChange={onChangeProject}
              ></input>
            </li>
            <li>
              <label>Description:</label>
              <br />
              <input
                className="form-control"
                type="text"
                defaultValue={description}
                onChange={onChangeDescription}
              ></input>
            </li>
            <li>
              <label>Date:</label> <br />
              <input
                className="form-control"
                type="date"
                defaultValue={date}
                onChange={onChangeDate}
              ></input>
            </li>
            <li>
              <label>Total: £</label>
              <br />
              <input
                className="form-control"
                type="text"
                defaultValue={total}
                onChange={onChangeTotal}
              ></input>
            </li>
          </ul>
          <Link
            class="btn btn-primary"
            // onClick={publishInvoice}
            // to={"/addExpense"}
            onClick={() => (modalOpen && project == "" ? close() : open())}
          >
            Publish data to project
          </Link>
        </div>
      </div>
      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            handleClose={close}
            text={
              <div className="row">
                <div className="col-6">
                  <img
                    src={image}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
                <div className="col-6">
                  <AddExpense
                    pName={project}
                    eDate={date}
                    eDescription={description}
                    eAmount={total}
                  />
                </div>
              </div>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
export default OcrApi;
