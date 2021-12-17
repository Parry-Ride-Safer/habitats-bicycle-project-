import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MapProvider } from "./Context/MapContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <MapProvider>
      <App />
    </MapProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
