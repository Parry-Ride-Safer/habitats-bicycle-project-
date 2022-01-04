import React from "react";
import { GpsLocation, Map, Navbar, SearchBox } from "./Components";
import { useGlobalMapContext } from "./Context/MapContext";
import { useLoadScript } from "@react-google-maps/api";
import FormComponent from "./Components/Login";
import "./app.css";

const libraries = ["places"];

function App() {
  const { panTo, onMapLoad, onMapClick, options } = useGlobalMapContext();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REA_APP_KEY,
    libraries,
  });

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <Navbar />
      <FormComponent />
      <div className="search-map-location">
        <SearchBox panTo={panTo} />
      </div>
      <Map options={options} onMapLoad={onMapLoad} onMapClick={onMapClick} />
      <div>
        <GpsLocation panTo={panTo} />
      </div>
    </>
  );
}

function Locate({panTo}) {
  return <button onClick={() => {
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null
    );
  }}
>
    <h1>BUTTON</h1>
  </button>
}


function Search ({panTo}) {
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    requestOptions: {
      location: {lat: () => 43.656484, lng: () => -79.383186},
      radius: 200 * 1000,
    },
  });

  return (
    <div>
    
    <Combobox 
      onSelect = {async (address) => {
        setValue(address, false);
        clearSuggestions();
        try{
          const results = await getGeocode({address})
          const{lat, lng} = await getLatLng(results[0])
          panTo({lat, lng})
        } catch (error) {
          console.log("error",error);
        }
      }}
    >
      <ComboboxInput
      value={value}
      onChange={(e)=>{
        setValue(e.target.value);
      }}
      disabled={!ready}
      placeholder="Enter an adress"
      />
      <ComboboxPopover>
        <ComboboxList>
        {status ==="OK" &&
          data.map(({id, description})=>(
            <ComboboxOption key={id} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
    </div>
  )
};

export default App;
