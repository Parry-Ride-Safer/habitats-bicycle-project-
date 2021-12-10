import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { load } from 'dotenv';
import './App.css';
import mapStyles from "./styles/mapStyles.css";

const libraries = ["places"]
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}

const center = {
  lat: 43.656484,
  lng: -79.383186,
}

const options = {
  styles: {mapStyles}
}

function App() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,

  })

  if (loadError) return "Error loading Maps"
  if (!isLoaded) return "Loading Maps";
  return (
    <div>
      <h1>Google MAP</h1>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom = {8}
        center = {center}
        options={options}
      ></GoogleMap>
  
    </div>
  );
}

export default App;