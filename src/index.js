import React from "react";
import ReactDOM from "react-dom/client";
import Store from "./store/Store";
/**
 * Index file connecting the app with the root div of public html file
 */

import App from "./App";
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Store>
    <App />
  </Store>
);
