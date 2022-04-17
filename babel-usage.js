const core = require("@babel/core");

const content =
  " import './style.css'; const a = require('./2.png'); const btn = document.querySelector('button');import handler from './clickHandler';btn.addEventListener('click', handler);";

const { code, map, ast } = core.transform(content, {
  presets: ["@babel/preset-env"],
});

console.log("code:", code);
console.log("map:", map);
console.log("ast:", ast);
