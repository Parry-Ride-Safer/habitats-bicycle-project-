import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DangerFormProvider } from "./Context/DangerFormContext";
import { MapProvider } from "./Context/MapContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <MapProvider>
      <DangerFormProvider>
        <App />
      </DangerFormProvider>
    </MapProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
