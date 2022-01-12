import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import useSwr from "swr";
import useSuperCluster from "use-supercluster";
import { formatRelative } from "date-fns";
import Axios from "axios";
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
import useSWR from "swr";
import logoBlue from "./PolygonBlue.png";

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

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function Map() {
  const {
    markers,
    setFinalMarkers,
    isBoxSelectDangerOpen,
    finalMarkers,
    onMapClick,
    onMapLoad,
    selected,
    setSelected,
    panTo,
    handleBoxDangerDetails,
  } = useGlobalMapContext();

  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);

  const url = "http://localhost:4000/location/";
  const { data, error } = useSWR(url, fetcher);
  const getFinalMarkers = data && !error ? data.slice(0, 200) : [];
  // console.log(data);

  return (
    <div>
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

        {getFinalMarkers.map((getMarker) => (
          <Marker
            key={getMarker.id}
            position={{
              lat: Number(getMarker.lat),
              lng: Number(getMarker.lng),
            }}
            icon={{
              url: logo,
              scaledSize: new window.google.maps.Size(50, 50),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 25),
            }}
          ></Marker>
        ))}

        {finalMarkers.map((fMarker) => (
          <Marker
            key={fMarker.id}
            position={{ lat: fMarker.lat, lng: fMarker.lng }}
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
        ))}

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
