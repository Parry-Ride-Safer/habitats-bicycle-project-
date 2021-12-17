import React from 'react';
import {GoogleMap, InfoBox, InfoWindow, Marker } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import {BoxSelectDanger, BoxDangerDescription} from "../";
import { useGlobalMapContext } from '../../Context/MapContext';
import "./map.css";
import "../BoxSelectDanger/boxSelectDanger.css";

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
}
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

const infoBoxOptions = { closeBoxURL: '', enableEventPropagation: true };

export default function Map () {
    const {markers, isBoxSelectDanger, finalMarkers, onMapClick, onMapLoad, selected, setSelected} = useGlobalMapContext()    
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
  
      <InfoBox
        options={infoBoxOptions}
        position={markers}>
          <div>
            <p>klbphpçbo</p>
          </div>
      
      </InfoBox>
      

      
      
      <BoxSelectDanger
        position = {markers}
        color="blue"
    />
        <BoxDangerDescription />
      </GoogleMap>  
    )
}

