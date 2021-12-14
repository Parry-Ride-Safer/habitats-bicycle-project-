import React, {useCallback, useContext, useRef, useState} from 'react';
import Map from "./Components/Map"
import SearchBox from "./Components/SearchBox";
import GpsLocation from './Components/GpsLocation';

function App() {
  
  return (
    <div>
      <h1>Feature NavBar</h1>
      <SearchBox />
      <GpsLocation />
      <Map />
    </div>
  );
}

export default App;