import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import Note from "./Note";
import Board from "./Board";

ReactDOM.render(<Board count={50} />, document.getElementById("root"));
registerServiceWorker();
