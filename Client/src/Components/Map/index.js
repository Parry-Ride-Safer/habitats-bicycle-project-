import React from 'react';
import {GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import {BoxSelectDanger, BoxDangerDescription} from "../";
import { useGlobalMapContext } from '../../Context/MapContext';
import "./map.css";

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
    const {instataneousMarker, markers, onMapClick, onMapLoad, selected, setSelected} = useGlobalMapContext();
  
    return(
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom = {8}
        center = {center}
        options = {options}
        onClick = {onMapClick}
        onLoad={onMapLoad}
        > 


      {/*   
      {markers.map((marker) => (
        <Marker 
          key={marker.time} 
          position={{lat: marker.lat, lng: marker.lng}}
          we can use the prop "icon" to change the icon according to our event.
          usar o seguinte código para o icon aparecer no sítio certo:
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0,0);
          anchor: new window.google.maps.Point(15, 15)
         
        onClick={()=>{setSelected(marker)}}
        />
     ))}
      <div className="icone">{temporaryMarker}</div>
        
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
        */}
        <BoxSelectDanger />
        <BoxDangerDescription />
      </GoogleMap>  
    )
}

