import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import "./style.css";
import gpsIcon from "../../../resources/gps-icon.png";
import { ReactComponent as LocationOn } from "../../../icons/modalBoxIcons/Location_on.svg";

export default function GpsLocation() {
  const { panTo } = useGlobalMapContext();

  return (
    <>
      <button
        className="gps-icon"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <LocationOn />
      </button>
    </>
  );
}
