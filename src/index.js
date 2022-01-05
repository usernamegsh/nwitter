import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import authService from "fbase";
import "./styles.css";
import styled from "styled-components";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
