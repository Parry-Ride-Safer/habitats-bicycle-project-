import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Axios from "axios";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [dangerType, setDangerType] = useState();
  const [markers, setMarkers] = useState();
  const [finalMarkers, setFinalMarkers] = useState([]);
  useEffect(() => {
    const fetchMarkers = async () => {
      const result = await Axios(process.env.REACT_APP_API_ROUTE_URL);
      setFinalMarkers(result.data);
    };
    fetchMarkers();
  }, []);

  const [selected, setSelected] = useState(null);
  const [isDangerDescriptionOpen, setIsDangerDescriptionOpen] = useState(false);
  const [isBoxSelectDangerOpen, setIsBoxSelectDangerOpen] = useState(false);
  const [dangerDescriptionInput, setDangerDescriptionInput] = useState([]);
  const [isBoxShowInputDetailsOpen, setIsBoxShowInputDetailsOpen] =
    useState(false);
  const [dangerTypeConvert, setdangerTypeConvert] = useState(null);
  const [voting, setVoting] = useState("");
  const [numberOfCharacters, setNumberOfCharacters] = useState(0);
  const [alertMsg, setAlertMsg] = useState(false);
  // login and profile temp tests from here :
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userTest, setUserTest] = useState([]);
  const [log, setLog] = useState("");
  const [infoTest, setinfoTest] = useState([]);
  const [info, setinfo] = useState([]);
  const [stateLogin, setStateLogin] = useState(false);

  const [getReportData, setGetReportdata] = useState([]);
  const [sendReportRequest, setSendReportRequest] = useState(false);

  const fetchReportData = async () => {
    setSendReportRequest(true);
    try {
      const reportData = await Axios(
        `http://localhost:4000/reports/${selected.id}`
      );
      setGetReportdata(reportData.data[0]);
      setSendReportRequest(false);
      console.log(getReportData);
    } catch (e) {
      setSendReportRequest(false);
    }
  };

  const handleDangerSubmit = (event) => {
    event.preventDefault();
    setIsBoxSelectDangerOpen(false);
    setIsDangerDescriptionOpen(true);
  };

  const handleBoxDangerDetails = () => {
    isBoxShowInputDetailsOpen(true);
  };

  let user = JSON.parse(localStorage.getItem("user-info"));

  const handleDangerDescriptionInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDangerDescriptionInput((values) => ({ ...values, [name]: value }));
    setNumberOfCharacters(event.target.value.length);
  };

  const handleDangerChoice = (event) => {
    console.log("this aint working chief");
    return setDangerType(event.target.value);
  };

  const handleDangerLevel = (event) => {
    setVoting(event.target.value);
  };

  const dangerFormSubmit = (event) => {
    event.preventDefault();
    if (dangerDescriptionInput.length === 0 || voting === "") {
      setAlertMsg(true);
    } else {
      setIsDangerDescriptionOpen(false);
      setFinalMarkers((finalMarkers) => [...finalMarkers, markers]);
      Axios.post("http://localhost:4000/reports/", {
        voting: voting,
        lat: markers.lat,
        lng: markers.lng,
        title: dangerType,
        information: dangerDescriptionInput.description,
        user_id: user.id,
        category_id: dangerTypeConvert,
      })
        .then((response) => {
          console.log(response);
          setAlertMsg(false);
        })
        .catch((err) => console.log(err));
      setVoting("");
      setDangerDescriptionInput([]);
    }
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
    mapRef.current.setZoom(15);
  }, []);

  return (
    <MapContext.Provider
      value={{
        alertMsg,
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
        numberOfCharacters,
        isDangerDescriptionOpen,
        isBoxSelectDangerOpen,
        handleDangerSubmit,
        handleDangerLevel,
        options,
        isBoxShowInputDetailsOpen,
        dangerDescriptionInput,
        handleDangerDescriptionInputs,
        handleBoxDangerDetails,
        dangerTypeConvert,
        setdangerTypeConvert,
        setIsBoxShowInputDetailsOpen,
        setVoting,
        voting,
        email,
        setEmail,
        password,
        setPassword,
        userTest,
        setUserTest,
        log,
        setLog,
        infoTest,
        setinfoTest,
        info,
        setinfo,
        fetchReportData,
        getReportData,
        sendReportRequest,
        stateLogin,
        setStateLogin,
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
