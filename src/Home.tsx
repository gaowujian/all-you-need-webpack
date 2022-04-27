import React from "react";
// import axios from "axios";
// console.log("axios:", axios);
// @ts-ignore
import txtContent from "./assets/extra.txt";

function home() {
  const name: string = "gaowujian";
  return (
    <div className="home" style={{ overflow: "hidden" }}>
      <h1 className="home-title">姓名:{name}</h1>
      <img className="profile" src="profile.jpg" alt="头像" />
      <p>{txtContent}</p>
    </div>
  );
}

export default home;
