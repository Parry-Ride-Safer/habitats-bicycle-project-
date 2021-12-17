import React from 'react';
import {GpsLocation, Map, Navbar, SearchBox} from './Components';
import {useGlobalMapContext} from './Context/MapContext';
import {useLoadScript} from '@react-google-maps/api';
import "./app.css"

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
      <Navbar />
      <div className="search-map-location">
        <SearchBox panTo={panTo}/>
        <GpsLocation panTo={panTo}/>
      </div>
      <Map options={options} onMapLoad={onMapLoad} onMapClick={onMapClick}/>
    </div>
  );
}

export default App;