import "./style.less";
import "./pure.css";
import _ from "lodash";
// @ts-ignore
import Home from "@/Home";
import React from "react";
import ReactDOM from "react-dom/client";
console.log("_:", _);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />);
