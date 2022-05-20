import React from "react";
import { useState } from "react";
// @ts-ignore
// import txtContent from "./assets/extra.txt";

function home() {
  const name: string = "gaowujian";
  const [value, setValue] = useState("default");
  return (
    <div className="home" style={{ overflow: "hidden" }}>
      <h1 className="home-title">姓名:{name}</h1>
      <h1 className="home-title">age:{name}</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      <img className="profile" src="profile.jpg" alt="头像" />
      {/* <p>{txtContent}</p> */}
    </div>
  );
}

export default home;
