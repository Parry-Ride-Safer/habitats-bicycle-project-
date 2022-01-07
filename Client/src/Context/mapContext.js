import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import Axios from "axios";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [dangerType, setDangerType] = useState();
  const [markers, setMarkers] = useState();
  const [finalMarkers, setFinalMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isDangerDescriptionOpen, setIsDangerDescriptionOpen] = useState(false);
  const [isBoxSelectDangerOpen, setIsBoxSelectDangerOpen] = useState(false);
  const [dangerDescriptionInputs, setDangerDescriptionInputs] = useState([]);
  const [isBoxDangerDetailsOpen, setIsBoxDangerDetailsOpen] = useState(false);

  const handleDangerSubmit = (event) => {
    event.preventDefault();
    setIsBoxSelectDangerOpen(false);
    setIsDangerDescriptionOpen(true);
  };

  const handleBoxDangerDetails = () => {
    setIsBoxDangerDetailsOpen(true);
  };

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
    console.log({ lat: markers.lat, lng: markers.lng });

    Axios.post("http://localhost:4000/reports/", {
        voting: 1,
        lat: markers.lat,
        lng: markers.lng,
        title: "string",
        information: "string",
        users_id: 1,
        category_id: 1
        })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;

    /*Axios.get("http://localhost:4000/location/", {
  })
    .then((response) => {
      setFinalMarkers(response.data)
      console.log(response.data)
    })
    .catch((err) => console.log(err));*/
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
    mapRef.current.setZoom(15);
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

export { MapProvider }
