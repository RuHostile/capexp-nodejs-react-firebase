import React from "react";
import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import NavBar from "./nav-bar.component";

function Api() {
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
  const textExtract = (text) => {
    //var Z = X.slice(X.indexOf(Y) + Y.length);
    // setInvoice("invoice:");
    // setProject("project");
    // setDescription("description");
    // setDate("date");
    // setTotal("Total: ");

    
    setInvoice(text.match(new RegExp("Invoice Number:" + '\\s(\\w+)'))[1]);
    // setProject(text.match(new RegExp("Project" + '\\s(\\w+)'))[1]);    
    // setDescription(text.match(new RegExp("Description" + '\\s(\\w+)'))[1]);
    setDate(text.match(new RegExp("Date:" + '\\s(\\w+)'))[1]);
    setTotal(text.match(new RegExp("Total: " + '\\s(\\w+)'))[1]);

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

  return (
    <div>
      <NavBar />

      <div class="d-flex justify-content-center">
        <div>
          <h3>Actual image uploaded</h3>
          <p>Choose an Image</p>
          <input type="file" onChange={handleChange} accept="image/*" />
          <br />
          <img src={image} width={400} />
        </div>

        <div>
          <h3>Extracted text</h3>
          <p className="matthew">{text}</p>

          <button onClick={handleClick} className="btn btn-secondary">
            convert to text
          </button>
          <ul>
            <li>
              <label>Invoice #: </label><br/><input type={text} value={invoice}></input>
            </li>
            <li>
            <label>Project #: </label><br/><input type={text} value={project}></input>

            </li>
            <li>
            <label>Description: </label><br/><input type={text} value={description}></input>

            </li>
            <li>
            <label>Date: </label><br/><input type={text} value={date}></input>

            </li>
            <li>
            <label>Total: </label><br/><input type={text} value={total}></input>

            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Api;
