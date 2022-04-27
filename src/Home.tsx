import React from "react";
// @ts-ignore
import txtContent from "./assets/extra.txt";

function home() {
  const name: string = "gaowujian";

  return (
    <div className="home" style={{ overflow: "hidden" }}>
      <h1 className="home-title">姓名:{name}</h1>
      <h1 className="home-title">姓名:{name}</h1>

      <img className="profile" src="profile.jpg" alt="头像" />
      <p>{txtContent}</p>
    </div>
  );
}

export default home;
