import React from "react";
import { Map, Navbar } from "./Components";
import { useGlobalMapContext } from "./Context/MapContext";
import { useLoadScript } from "@react-google-maps/api";
// import FormComponent from "./Components/Login";
import LoginTest from "./Components/loginTest";
import "./app.css";

const libraries = ['places'];

function App() {
  const { onMapLoad, onMapClick, options } = useGlobalMapContext();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries,
  });

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <LoginTest />
      <Navbar />

      {/* <FormComponent /> */}
      <Map options={options} onMapLoad={onMapLoad} onMapClick={onMapClick} />
    </>
  );
}

export default App;
