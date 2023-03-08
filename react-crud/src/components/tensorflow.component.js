import React, { Component} from "react";
import NavBar from "./nav-bar.component";

export default class TensorFlowOpticalCharacterRecognition extends Component{

   constructor(props) {
      super(props);  
      this.state = {
        file: "",
      };
    }
   render() {

      return( 
   
         <div className="tf-example">
            <NavBar/>
            <h1>TFOCR</h1>
         </div>
      )
   }
}