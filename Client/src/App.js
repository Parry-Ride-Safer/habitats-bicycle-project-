import React, {useCallback, useRef, useState} from 'react';
import {GoogleMap, HeatmapLayer, InfoBox, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import './styles/App.css';
import mapStyles from "./styles/mapStyles.css";
import { formatRelative } from 'date-fns';

const libraries = ['places', 'visualization', 'drawing', 'geometry']

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}

const center = {
  lat: 43.656484,
  lng: -79.383186,
}

const options = {
  styles: mapStyles,
  disableDefaultUI:true,
  zoomControl:true
}
/*
const onLoad = heatmapLayer => {
  console.log('HeatmapLayer onLoad heatmapLayer: ', heatmapLayer)
}
const onUnmount = heatmapLayer => {
  console.log('HeatmapLayer onUnmount heatmapLayer: ', heatmapLayer)
}
*/

 function App() {
  
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_KEY,
    libraries,
  })
  /*
  const google = window.google;
  
    const data = [{
        new google.maps.LatLng(37.782, -122.447),
        new google.maps.LatLng(37.782, -122.445),
        new google.maps.LatLng(37.782, -122.443),
        new google.maps.LatLng(37.782, -122.441),
        new google.maps.LatLng(37.782, -122.439),
        new google.maps.LatLng(37.782, -122.437),
        new google.maps.LatLng(37.782, -122.435),
        new google.maps.LatLng(37.785, -122.447),
        new google.maps.LatLng(37.785, -122.445),
        new google.maps.LatLng(37.785, -122.443),
        new google.maps.LatLng(37.785, -122.441),
        new google.maps.LatLng(37.785, -122.439),
        new google.maps.LatLng(37.785, -122.437),
        new google.maps.LatLng(37.785, -122.435)
    }]
    */
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  console.log(markers)

  const onMapClick = useCallback((event) => { 
    setMarkers((current) => [
      ...current, 
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
   }, [])

  const mapRef = useRef();
  const onMapLoad = useCallback ((map)=> {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({ lat, lng});
    mapRef.current.setZoom(14);
  }, []);

  
  if (loadError) return "Error loading Maps"
  if (!isLoaded) return "Loading Maps";
  return (
    <div>
      <h1>Google MAP</h1>

      <Search panTo={panTo}/>
      <Locate panTo={panTo}/>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom = {8}
        center = {center}
        options = {options}
        onClick = {onMapClick}
        onLoad={onMapLoad}
        >
       
      
        {markers.map((marker) => (
          <Marker 
            key={marker.time} 
            position={{lat: marker.lat, lng: marker.lng}}
            /*we can use the prop "icon" to change the icon according to our event.
            usar o seguinte código para o icon aparecer no sítio certo:
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0,0);
            anchor: new window.google.maps.Point(15, 15)
            */
          onClick={()=>{setSelected(marker)}}
          />
 
        ))}
        {selected  ? (<InfoWindow position = {{lat: selected.lat, lng: selected.lng}}
         onCloseClick={() => 
          {setSelected(null)}}>
          <div>
            <h2>Add new window</h2>
            <p>{formatRelative(selected.time, new Date())}</p>
          </div>
        </InfoWindow>) : null}
      </GoogleMap>
    </div>
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
  )
};

export default App;