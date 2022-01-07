import React from "react";
import { GoogleMap, InfoWindow, Marker, MarkerClusterer } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import {
  BoxSelectDanger,
  BoxDangerDescription,
  GpsLocation,
  SearchBox,
  BoxDangerList,
} from "../";
import { useGlobalMapContext } from "../../Context/MapContext";
import "./map.css";
import "../BoxSelectDanger/boxSelectDanger.css";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 52.52,
  lng: 13.405,
};

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
  disableDefaultUI: true,
  zoomControl: true,
};

/*const clusterStyles = [{
    width: 35,
    height: 35,
    textColor: '#ff00ff',
    textSize: 20
  }, {
    width: 45,
    height: 45,
    textColor: '#ff0000',
    textSize: 25
  }, {
    width: 55,
    height: 55,
    textColor: '#ffffff',
    textSize: 30
  }]*/

export default function Map() {
  const {
    markers,
    isBoxSelectDangerOpen,
    finalMarkers,
    onMapClick,
    onMapLoad,
    selected,
    setSelected,
    panTo,
    handleBoxDangerDetails,
  } = useGlobalMapContext();
 

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
      yesIWantToUseGoogleMapApiInternals
    >
      <div className="search-map-location">
        <SearchBox panTo={panTo} />
      </div>
      <GpsLocation panTo={panTo} />

      <MarkerClusterer
        /*styles={clusterStyles}*/
        gridSize = {60}
      >
          {(clusterer) =>
            finalMarkers.map((fMarker) => (
              <Marker key={fMarker.index}
                position={{ lat: fMarker.lat, lng: fMarker.lng }}
                clusterer={clusterer}
                onClick={() => {
                  setSelected(fMarker);
              }} 
              />
            ))
          }
        </MarkerClusterer>

      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <p>Categorias</p>
            <button type="button" onClick={handleBoxDangerDetails}>
              More details
            </button>
            <p>{formatRelative(selected.time, new Date())}</p>
          </div>
        </InfoWindow>
      ) : null}

      {isBoxSelectDangerOpen ? <Marker position={markers} /> : "box-overlay"}
      {isBoxSelectDangerOpen ? <BoxSelectDanger /> : "box-overlay"}
      <BoxDangerDescription />
      <BoxDangerList />
    </GoogleMap>
  );
}
