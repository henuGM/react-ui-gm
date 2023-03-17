import React from "react";
import ReactDOM from "react-dom/client";
import AsyncDemo from "./asyncComponent";
import Keep from "./keep";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <h2>AsyncDemo</h2>
    <AsyncDemo></AsyncDemo>
    <br></br>
    <h2>KeepAive</h2>
    <Keep></Keep>
  </React.StrictMode>
);
