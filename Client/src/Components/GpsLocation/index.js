import React, { useContext, useRef, useCallback } from "react";
import { MapContext } from "../../Context/MapContext";

export default function GpsLocation() {

  const {panTo} = useContext(MapContext)

   return <button onClick={() => {
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null
    );
  }}
>
    <h1>BUTTON</h1>
  </button>
}