import React from "react";
import { Map } from "./Components";
import { useGlobalMapContext } from "./Context/mapContext";
import { useLoadScript } from "@react-google-maps/api";
// import FormComponent from "./Components/Login";

import "./app.css";

// import LoginAndProfile from "./Components/LoginAndProfile";

const libraries = ["places"];

function App() {
  const { onMapLoad, onMapClick, options } = useGlobalMapContext();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries,
  });

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      {/* <LoginAndProfile /> */}
      <Map options={options} onMapLoad={onMapLoad} onMapClick={onMapClick} />
    </div>
  );
}

export default App;
