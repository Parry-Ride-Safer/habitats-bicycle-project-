import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [dangerType, setDangerType] = useState();
  const [markers, setMarkers] = useState();
  const [finalMarkers, setFinalMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isDangerDescriptionOpen, setIsDangerDescriptionOpen] = useState(false);
  const [isBoxSelectDangerOpen, setIsBoxSelectDangerOpen] = useState(false);

  const handleDangerSubmit = (event) => {
    event.preventDefault();
    setIsBoxSelectDangerOpen(false);
    setIsDangerDescriptionOpen(true);
  };

  const handleDangerChoice = (event) => {
    setDangerType(event.target.value);
  };

  const dangerFormSubmit = (event) => {
    event.preventDefault();
    setIsDangerDescriptionOpen(false);
    setFinalMarkers((finalMarkers) => [...finalMarkers, markers]);
  };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = useCallback((event) => {
    setIsBoxSelectDangerOpen((prevState) => !prevState);
    setMarkers({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    });
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
    zoomControl: true,
  };

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  return (
    <MapContext.Provider
      value={{
        dangerType,
        setDangerType,
        markers,
        finalMarkers,
        selected,
        setSelected,
        handleDangerChoice,
        panTo,
        onMapClick,
        onMapLoad,
        dangerFormSubmit,
        isDangerDescriptionOpen,
        isBoxSelectDangerOpen,
        handleDangerSubmit,
        options,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useGlobalMapContext = () => {
  return useContext(MapContext);
};

export { MapProvider };
