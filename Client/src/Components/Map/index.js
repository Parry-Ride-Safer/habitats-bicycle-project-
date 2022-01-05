import React from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
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

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

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
    >
      <div className="search-map-location">
        <SearchBox panTo={panTo} />
      </div>
      <GpsLocation panTo={panTo} />

      {finalMarkers.map((fMarker) => (
        <Marker
          key={fMarker.index}
          position={{ lat: fMarker.lat, lng: fMarker.lng }}
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

      {isBoxSelectDangerOpen ? <Marker position={markers} /> : "box-overlay"}
      {isBoxSelectDangerOpen ? <BoxSelectDanger /> : "box-overlay"}
      <BoxDangerDescription />
      <BoxDangerList />
    </GoogleMap>
  );
}
