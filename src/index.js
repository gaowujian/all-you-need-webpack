// import content from "./data";
import "./style.css";
// console.log("content:", content);
// console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
// console.log("process.env.NODE_ENV:", globalVariable);
const a = require("./2.png");

console.log("a:", a);
const b = require("./extra.txt");
console.log("b:", b);

import Home from "./Home";
import React from "react";
import ReactDOM from "react-dom";
ReactDOM.render(<Home />, document.getElementById("root"));

// setTimeout(() => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("get", "/users");
//   //   xhr.responseType = "json";
//   xhr.onreadystatechange = function (e) {
//     if (e.target.readyState === 4) {
//       console.log("xhr.responseText:", xhr.responseText);
//       console.log("xhr.response:", xhr.response);
//     }
//   };
//   xhr.send();
// }, 1000);

// setTimeout(() => {
//   const axios = window.axios;
//   axios
//     .get("/users")
//     .then((res) => res.data)
//     .then((data) => {
//       console.log("data:", data);
//     });
// }, 1000);
