import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import Axios from 'axios';

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [dangerType, setDangerType] = useState();
  const [markers, setMarkers] = useState();
  const [finalMarkers, setFinalMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isDangerDescriptionOpen, setIsDangerDescriptionOpen] = useState(false);
  const [isBoxSelectDangerOpen, setIsBoxSelectDangerOpen] = useState(false);
  const [dangerDescriptionInputs, setDangerDescriptionInputs] = useState([])
  const [isBoxDangerDetailsOpen, setIsBoxDangerDetailsOpen] = useState(false)

  const handleDangerSubmit = (event) => {
    event.preventDefault();
    setIsBoxSelectDangerOpen(false);
    setIsDangerDescriptionOpen(true);
  };

  const handleBoxDangerDetails = () => {
    setIsBoxDangerDetailsOpen(true)
  }

  const handleDangerDescriptionInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDangerDescriptionInputs((values) => ({ ...values, [name]: value }));
  };

  const handleDangerChoice = (event) => {
    setDangerType(event.target.value);
  };

  const dangerFormSubmit = (event) => {
    event.preventDefault();
    setIsDangerDescriptionOpen(false);
    setFinalMarkers((finalMarkers) => [...finalMarkers, markers]);
    Axios.post("http://localhost:4000/routes/", {
        lat: finalMarkers.lat,
        lng: finalMarkers.lng,
        category: dangerType,
        information: dangerDescriptionInputs 
        }).then((response) => {
          console.log(response)
        }).catch(err => console.log(err))
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
        isBoxDangerDetailsOpen,
        dangerDescriptionInputs,
        handleDangerDescriptionInputs,
        handleBoxDangerDetails,
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
