import React from "react";
import {
  GoogleMap,
  InfoBox,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { formatRelative, parse } from "date-fns";
import {
  BoxSelectDanger,
  BoxDangerDescription,
  GpsLocation,
  SearchBox,
  BoxDangerList,
} from "../";
import { useGlobalMapContext } from "../../Context/mapContext";
import "./map.css";
import "../BoxSelectDanger/boxSelectDanger.css";
import logo from "./Polygon38.png";
import logoBlue from "./PolygonBlue.png";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 52.52,
  lng: 13.405,
};

const mapOptions = {
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
    setIsBoxDangerDetailsOpen,
    finalMarkers,
    onMapClick,
    onMapLoad,
    selected,
    setSelected,
    panTo,
    handleBoxDangerDetails,
  } = useGlobalMapContext();

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={mapOptions}
        onClick={onMapClick}
        onLoad={onMapLoad}
        yesIWantToUseGoogleMapApiInternals
      >
        <div className="search-map-location">
          <SearchBox panTo={panTo} />
        </div>
        <GpsLocation panTo={panTo} />
<<<<<<< HEAD
  
   
  <MarkerClusterer
        /*styles={clusterStyles}*/
        gridSize = {60}
  >
        {(clusterer) =>
=======

        <MarkerClusterer
          /*styles={clusterStyles}*/
          gridSize={60}
        >
          {(clusterer) =>
>>>>>>> 8294a9fdba8108d3c2b0d8f50bec8c1306ed8cc4
            finalMarkers.map((fMarker) => (
              <Marker
                key={fMarker.id}
                position={{
                  lat: Number(fMarker.lat),
                  lng: Number(fMarker.lng),
                }}
                clusterer={clusterer}
                icon={{
                  url: logo,
                  scaledSize: new window.google.maps.Size(50, 50),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(25, 25),
                }}
                onClick={() => {
                  setSelected(fMarker);
                }}
              />
<<<<<<< HEAD
          ))}    
    </MarkerClusterer>
{/*
    {selected ? (
        <InfoBox
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
          </div>
        </InfoBox>
      ) : null}
        */}
        
      {selected ? setIsBoxDangerDetailsOpen(true) : null}
=======
            ))
          }
        </MarkerClusterer>

        {selected ? (
          <InfoBox
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
            </div>
          </InfoBox>
        ) : null}
>>>>>>> 8294a9fdba8108d3c2b0d8f50bec8c1306ed8cc4

        {isBoxSelectDangerOpen ? (
          <Marker
            position={markers}
            icon={{
              url: logoBlue,
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 25),
            }}
          />
        ) : (
          "box-overlay"
        )}
        {isBoxSelectDangerOpen ? <BoxSelectDanger /> : "box-overlay"}
        <BoxDangerDescription />
        <BoxDangerList />
      </GoogleMap>
    </div>
  );
}
