import React from 'react';
import {GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import {BoxSelectDanger, BoxDangerDescription} from "../";
import { useGlobalMapContext } from '../../Context/MapContext';
import "./map.css";
import "../BoxSelectDanger/boxSelectDanger.css";
import star from "../../starblack.png";

const mapContainerStyle = {
  width: "100vw",
  height: "80vh",
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
    const {markers, finalMarkers, onMapClick, onMapLoad, selected, setSelected} = useGlobalMapContext();
    return(
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom = {8}
        center = {center}
        options = {options}
        onClick = {onMapClick}
        onLoad={onMapLoad}
        > 
 

  {finalMarkers.map((fMarker) => (
    <Marker 
      key={fMarker.index}
      position={{lat: fMarker.lat, lng: fMarker.lng}}
      onClick={()=>{setSelected(fMarker)}}
    />
  ))}
  
  {selected  ? (<InfoWindow 
        position = {{lat: selected.lat, lng: selected.lng}}
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
{/*
  {markers.map((marker) => (
        <Marker 
          key={marker.time} 
          position={{lat: marker.lat, lng: marker.lng}}
          onClick={()=>{setSelected(marker)}}
         
        />
     ))}
  */}  
     
        <BoxSelectDanger />
        <BoxDangerDescription />
      </GoogleMap>  
    )
}

