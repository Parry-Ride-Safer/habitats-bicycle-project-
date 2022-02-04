import React from "react";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import {
  BoxDoneMsg,
  CreateComplain,
  BoxShowInputDetails,
  GpsLocation,
  SearchBox,
  VotingBox,
  CreateReport,
  LoginAndProfile
} from "../../index";
import { useGlobalMapContext } from "../../../Context/mapContext";
import "./map.css";
import logoBlue from "./PolygonBlue.png";
import yellow from "../../../icons/modalBoxIcons/Group 550.svg";
import orange from "../../../icons/modalBoxIcons/Group 551.svg";
import red from "../../../icons/modalBoxIcons/Group 552.svg";
import mapStyles from "./mapStyles";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 52.52,
  lng: 13.405,
};

const mapOptions = {
  styles: mapStyles,
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
    getReportData,
    marker,
    dispatch,
    isReportWindowInputOpen,
    finalMarkers,
    onMapClick,
    onMapLoad,
    setSelected,
    panTo,
  } = useGlobalMapContext();

  return (
    <div className="teste-flex">
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={mapOptions}
      onClick={onMapClick}
      onLoad={onMapLoad}
      yesIWantToUseGoogleMapApiInternals
    >
      <LoginAndProfile />
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
                url: 
                  ((Number(fMarker.voting).toFixed(2) <=1.29) ? yellow :
                  (
                    (Number(fMarker.voting).toFixed(2) >= 1.30) && 
                    (Number(fMarker.voting).toFixed(2) <=2.29) 
                  ) ? orange : red ) ,
                scaledSize: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 25),
              }}
              onClick={(event) => {
                dispatch({ type: "OPEN_MARKER_REPORT" });
                setSelected(fMarker);
                fetchReportData(fMarker);
              }}
            />
          ))
        }
      </MarkerClusterer>

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
      {isReportWindowInputOpen ? <CreateReport /> : "box-overlay"}

      <BoxDoneMsg />
      <BoxShowInputDetails />
      <VotingBox />
      <CreateComplain />
    </GoogleMap>
    </div>
  );
}
