import React from 'react';
import Map from "./Components/Map/Map"
import SearchBox from './Components/SearchBox/SearchBox';
import GpsLocation from './Components/GpsLocation/GpsLocation';
import { useGlobalMapContext } from './Context/MapContext';
import {useLoadScript } from '@react-google-maps/api';

const libraries = ['places']

function App() {
  const {panTo, onMapLoad, onMapClick, options} = useGlobalMapContext();
  
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries
  })

  if (loadError) return "Error loading Maps"
  if (!isLoaded) return "Loading Maps";
    
  return (
    <div>
      <h1>Feature NavBar</h1>
      <SearchBox panTo={panTo}/>
      <GpsLocation panTo={panTo}/>
      <Map options={options} onMapLoad={onMapLoad} onMapClick={onMapClick}/>
    </div>
  );
}

export default App;