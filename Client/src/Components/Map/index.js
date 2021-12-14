import React, {useCallback, useRef, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

const libraries = ['places', 'visualization', 'drawing', 'geometry']

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}

const center = {
  lat: 52.5200,
  lng: 13.4050,
}

const options = {
  styles: [
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
  disableDefaultUI:true,
  zoomControl:true
}

export default function Map () {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_KEY,
        libraries,
      })
      
      const [markers, setMarkers] = useState([]);
      const [selected, setSelected] = useState(null);
    
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
    
     
      
      if (loadError) return "Error loading Maps"
      if (!isLoaded) return "Loading Maps";

    return(
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
            <p>Categorias</p>
            <ul>
              <li>Problem 1</li>
              <li>Problem 2</li>
              <li>Problem 3</li>
            </ul>
            <p>{formatRelative(selected.time, new Date())}</p>
          </div>
        </InfoWindow>) : null}
      </GoogleMap>  
    )
}

