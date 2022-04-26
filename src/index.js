import content from "./data";
import "./style.less";
import "./pure.css";
console.log("content:", content);
import Home from "./Home";
import React from "react";
import ReactDOM from "react-dom";
ReactDOM.render(<Home />, document.getElementById("root"));
