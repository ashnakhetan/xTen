/**
 * This is a popup view
 * This script is bundled and imported by
 * popup.html
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./Popup/App";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);