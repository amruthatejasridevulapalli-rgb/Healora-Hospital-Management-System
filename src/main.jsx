import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


import "./index.css";
import "./App.css";

import "./styles/global.css";
import "./styles/themes.css";
import "./styles/variables.css";
import "./styles/animations.css";
import "./styles/components.css";

import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);