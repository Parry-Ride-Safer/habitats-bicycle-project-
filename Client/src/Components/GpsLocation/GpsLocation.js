import React from "react";
import {useGlobalMapContext } from "../../Context/MapContext";

export default function GpsLocation() {

  const {panTo} = useGlobalMapContext();

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
    <h1>GPS Icon</h1>
  </button>
}