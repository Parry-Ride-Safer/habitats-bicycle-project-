import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

const MapContext = createContext();

const MapProvider = ({ children }) => {

  const [dangerType, setDangerType] = useState();
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isDangerDescriptionOpen, setIsDangerDescriptionOpen] = useState(false)
  const [isBoxSelectDangerOpen, setIsBoxSelectDangerOpen] = useState(false)

  const handleDangerSubmit = (event) => {
    event.preventDefault();
    setIsBoxSelectDangerOpen(false)
    setIsDangerDescriptionOpen(true)
  }

  const handleCloseModal = () => {
    setIsBoxSelectDangerOpen(false)
  }

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = useCallback((event) => {
    setIsBoxSelectDangerOpen(prevState => !prevState)
    setMarkers([{ lat: event.latLng.lat(), lng: event.latLng.lng() }])
    console.log(markers)
  }, []);

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
    zoomControl: true
  }

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);


  return (
    <MapContext.Provider value={{
      setDangerType,
      markers,
      selected,
      setSelected,
      panTo,
      onMapClick,
      onMapLoad,
      isDangerDescriptionOpen,
      isBoxSelectDangerOpen,
      handleDangerSubmit,
      handleCloseModal,
      options
    }}>
      {children}
    </MapContext.Provider>
  )
}

export const useGlobalMapContext = () => {
  return useContext(MapContext)
}

export { MapProvider };
