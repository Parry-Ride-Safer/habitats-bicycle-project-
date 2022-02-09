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
  LoginAndProfile,
} from "../../index";
import { useGlobalMapContext } from "../../../Context/mapContext";
import { iconScale } from "../../functions";
import "./map.css";
import logoBlue from "./PolygonBlue.png";
import yellow from "../../../icons/modalBoxIcons/Group 550.svg";
import orange from "../../../icons/modalBoxIcons/Group 551.svg";
import red from "../../../icons/modalBoxIcons/Group 552.svg";
import { ReactComponent as Parry } from "../../../icons/modalBoxIcons/Parry_Logo.svg";
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
  zoomControl: false,
};

export default function Map() {
  const {
    fetchReportData,
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
        zoom={12}
        center={center}
        options={mapOptions}
        onClick={onMapClick}
        onLoad={onMapLoad}
        yesIWantToUseGoogleMapApiInternals
      >
        <LoginAndProfile />
        <div className="Parry-logo">
          <Parry />
        </div>

        <div className="search-map-location">
          <SearchBox panTo={panTo} />
        </div>
        <GpsLocation panTo={panTo} />
        <MarkerClusterer gridSize={60}>
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
                    Number(fMarker.voting).toFixed(2) <= 1.29
                      ? yellow
                      : Number(fMarker.voting).toFixed(2) >= 1.3 &&
                        Number(fMarker.voting).toFixed(2) <= 2.29
                      ? orange
                      : red,
                  scaledSize: new window.google.maps.Size(
                    iconScale(fMarker),
                    iconScale(fMarker)
                  ),
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
