function loader(source) {
  const txt = source.toString();
  const script = `const content = "我是经过自定义loader处111理的文件,源内容是${txt}"; \n
  const div = document.createElement("div");\n
  div.innerText = content; \n
  document.body.appendChild(div)`;
  return script;
}
loader.raw = true;
module.exports = loader;
