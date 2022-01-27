import React from "react";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import {
  BoxDangerDescription,
  BoxDoneMsg,
  BoxShowInputDetails,
  GpsLocation,
  SearchBox,
  VotingBox,
  ReportIssue
} from "../../index";
import { useGlobalMapContext } from "../../../Context/mapContext";
import "./map.css";
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
    fetchReportData,
    marker,
    isBoxSelectDangerOpen,
    setIsBoxShowInputDetailsOpen,
    isReportWindowInputOpen,
    finalMarkers,
    onMapClick,
    onMapLoad,
    selected,
    setSelected,
    panTo,
  } = useGlobalMapContext();

  return (
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
      <MarkerClusterer
        gridSize={60}
        /*styles={clusterStyles}*/
      >
        {(clusterer) =>
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
              onClick={(event) => {
                setSelected(fMarker)
                fetchReportData(fMarker);
              }}
            />
          ))
        }
      </MarkerClusterer>

      {selected ? setIsBoxShowInputDetailsOpen(true) : null}

      {isReportWindowInputOpen ? (
        <Marker
          position={marker}
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
      {isReportWindowInputOpen ? <BoxDangerDescription /> : "box-overlay"}
      
      <BoxDoneMsg />
      <BoxShowInputDetails />
      <VotingBox />
      <ReportIssue />
    </GoogleMap>
  );
}
