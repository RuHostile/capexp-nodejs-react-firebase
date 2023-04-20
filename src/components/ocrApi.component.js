import "../index.css";
import React from "react";
import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import NavBar from "./nav-bar.component";
import { Link } from "react-router-dom";

function OcrApi() {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  const [invoice, setInvoice] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [total, setTotal] = useState("");

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

  const textExtract = (text) => {
    let regExInvoice = /(?<=INVOICE # )\d+/g;
    let regExDescription = /(?<=DESCRIPTION ).+/g;
    let regExProject = /(?<=Project Number: )\d+/g;
    let regExDate = /(?<=DATE )\d+\/\d+\/\d+/g;
    let regExTotal =
      /(?<=TOTAL [\$\£]?)([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?/g;

    if (text.match(regExInvoice) != null) {
      setInvoice(text.match(regExInvoice)[0]);
    } else {
      setInvoice("Please Fill");
    }
    if (text.match(regExDescription) != null) {
      setDescription(text.match(regExDescription)[0]);
    } else {
      setProject("Please Fill");
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

  const handleClick = () => {
    Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
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
    sessionStorage.setItem("currentProject", JSON.stringify(parseInt(project)));
    sessionStorage.setItem("currentDescription", JSON.stringify(description));
    sessionStorage.setItem("currentDate", JSON.stringify(date));
    sessionStorage.setItem(
      "currentTotal",
      JSON.stringify(parseFloat(total.replace(/,/g, "")))
    );
  };

  return (
    <div className="dashboard-container" style={{ backgroundColor: "#1A5F7A" }}>
      <NavBar class="row" />

      <div className="d-flex">
        <div class="col col-4 ">
          <h3>Actual image uploaded</h3>
          <p>Choose an Image</p>
          <input type="file" onChange={handleChange} accept="image/*" />
          <br />
          <img src={image} style={{maxWidth: "100%", maxHeight:"100%"}} />
        </div>

        <div class="col col-4">
          <h3>Extracted text</h3>
          <button onClick={handleClick} className="btn btn-secondary">
            convert to text
          </button>
          <p className="matthew">{text}</p>
        </div>

        <div class="col col-4">
          <h3>Invoice / Reciept Data</h3>
          <ul>
            <li>
              <label>Invoice #:</label>
              <br />
              <input type="text" defaultValue={invoice}></input>
            </li>
            <li>
              <label>Project #:</label>
              <br />
              <input
                type="text"
                defaultValue={project}
                onChange={onChangeProject}
              ></input>
            </li>
            <li>
              <label>Description:</label>
              <br />
              <input
                type="text"
                defaultValue={description}
                onChange={onChangeDescription}
              ></input>
            </li>
            <li>
              <label>Date:</label> <br />
              <input
                type="text"
                defaultValue={date}
                onChange={onChangeDate}
              ></input>
            </li>
            <li>
              <label>Total: £</label>
              <br />
              <input
                type="text"
                defaultValue={total}
                onChange={onChangeTotal}
              ></input>
            </li>
          </ul>
          <Link
            class="btn btn-primary"
            onClick={publishInvoice}
            to={"/addExpense"}
          >
            Publish data to project
          </Link>
        </div>
      </div>
    </div>
  );
}
export default OcrApi;
