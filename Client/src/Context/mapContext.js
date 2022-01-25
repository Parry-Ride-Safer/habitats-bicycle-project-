import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Axios from "axios";
import { issueType } from "../Data/dangerTypeSelection";


const MapContext = createContext();

const MapProvider = ({ children }) => {
  const [dangerType, setDangerType] = useState();
  const [marker, setMarker] = useState();
  const [finalMarkers, setFinalMarkers] = useState([]);
  useEffect(() => {
    const fetchMarkers = async () => {
      const result = await Axios(process.env.REACT_APP_API_ROUTE_URL);
      setFinalMarkers(result.data);
    };
    fetchMarkers();
  }, []);

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
  
  
  /*Flow to create a new Marker*/
  const [selected, setSelected] = useState(null);
  const [isBoxSelectDangerOpen, setIsBoxSelectDangerOpen] = useState(false);
  const [isReportWindowInputOpen, setIsReportWindowInputOpen] = useState(false);
  const [reportDescriptionInput, setReportDescriptionInput] = useState([]);
  const [isBoxWithDoneMsgOpen, setIsBoxWithDoneMsgOpen] = useState(false) 

  
  
  /*image Upload*/
  // const [fileInputState, setFileInputState] = useState('');
  // const [previewSource, setPreviewSource] = useState('');
  // const [selectedFile, setSelectedFile] = useState();
  // const [successMsg, setSuccessMsg] = useState('');
  // const [errMsg, setErrMsg] = useState('');



  
  
  const onMapClick = useCallback((event) => {
  setIsBoxSelectDangerOpen((prevState) => !prevState);
  setMarker({
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
    time: new Date(),
  });
}, []);


const handleDangerSubmit = (event) => {
  event.preventDefault();
  setIsBoxSelectDangerOpen(false);
  setIsReportWindowInputOpen(true);
};

const handleDangerDescriptionInputs = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setReportDescriptionInput((values) => ({ ...values, [name]: value }));
  setNumberOfCharacters(event.target.value.length);
};

const findCategoryID = [issueType.find((element) => element.type === dangerType)]
  
const dangerFormSubmit = (event) => {
  event.preventDefault();
  if (reportDescriptionInput.length === 0 || voting === "") {
    setAlertMsg(true);
  } else {
    setIsReportWindowInputOpen(false);
    Axios.post("http://localhost:4000/reports/", {
      voting: voting,
      lat: marker.lat,
      lng: marker.lng,
      title: dangerType,
      information: reportDescriptionInput.description,
      user_id: user.id,
      category_id: findCategoryID[0].nb,
      // image: fileInputState, 
        })
      .then((response) => {
        setAlertMsg(false);
        setFinalMarkers((finalMarkers) => [...finalMarkers, {...marker, id:response.data.id}]);
        setIsBoxWithDoneMsgOpen(true)
      })
      .catch((err) => console.log(err));
    setVoting("");
    setReportDescriptionInput([]);
  }
};




const showSubmittedReport = () => {
  setIsBoxWithDoneMsgOpen(false)
}

/*Flow to watch a single spot informations*/
const [sendReportRequest, setSendReportRequest] = useState(false);
const [getReportData, setGetReportdata] = useState([]);
const [isBoxShowInputDetailsOpen, setIsBoxShowInputDetailsOpen] = useState(false);
const [isReportIssueBoxOpen, setIsReportIssueBoxOpen] = useState(false)
const [isVotingBoxOpen, setIsVotingBoxOpen] = useState(false);

const fetchReportData = async (fMarker) => {
  setSendReportRequest(true);
  try {
    const reportData = await Axios(
      `http://localhost:4000/reports/${fMarker.id}`
    );
    setGetReportdata(reportData.data[0]);
    setSendReportRequest(false);
    setSelected("");
  } catch (e) {
    setSendReportRequest(false);
  }
};

const handleBoxShowInputDetailsState = () => {
  setIsBoxShowInputDetailsOpen(false)
}

const handleReportIssueWindow = () => {
  setIsReportIssueBoxOpen(true)
}

const handleAddVote = (event) => {
  event.preventDefault();
  Axios.post(`http://localhost:4000/reports/${getReportData.id}/vote`, {
    voting: voting,
    report_id: getReportData.id,
    user_id: user.id,
  })
    .then((response) => {
      setAlertMsg(false);
      setIsBoxWithDoneMsgOpen(true)
      console.log(response)
  })
    .catch((err) => console.log(err));
}



/* 
  let user = JSON.parse(localStorage.getItem("user-info")); */
  let user = document.cookie

  const handleDangerChoice = (event) => {
    console.log("this aint working chief");
    return setDangerType(event.target.value);
  };

  const handleDangerLevel = (event) => {
    setVoting(event.target.value);
  };
  
  const handleRateSpotButton = () => {
    setIsVotingBoxOpen(true)
  }

  
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
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
        marker,
        finalMarkers,
        selected,
        setSelected,
        panTo,
        onMapClick,
        onMapLoad,
        dangerFormSubmit,
        numberOfCharacters,
        isVotingBoxOpen,
        isReportWindowInputOpen,
        isBoxSelectDangerOpen,
        handleAddVote,
        handleBoxShowInputDetailsState,
        handleDangerChoice,
        handleDangerDescriptionInputs,
        handleDangerSubmit,
        handleDangerLevel,
        handleRateSpotButton,
        handleReportIssueWindow,
        options,
        isBoxShowInputDetailsOpen,
        isBoxWithDoneMsgOpen,
        isReportIssueBoxOpen,
        reportDescriptionInput,
        setIsBoxShowInputDetailsOpen,
        setVoting,
        setIsVotingBoxOpen,
        showSubmittedReport,
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
