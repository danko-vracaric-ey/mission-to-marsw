import React from "react";
import ReactDOM from "react-dom/client";

/**
 * Index file connecting the app with the root div of public html file
 */

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
