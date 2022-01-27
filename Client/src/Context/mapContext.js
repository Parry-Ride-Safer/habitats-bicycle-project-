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
  const [stateLogin, setStateLogin] = useState(false);
  
  const [welcomeStatus,setWelcomeStatus] = useState(false);
  const handleWelcomeStatusClick =() => { 
    setWelcomeStatus(!welcomeStatus)
} 

  /*Flow to create a new Marker*/
  const [selected, setSelected] = useState(null);
  const [isBoxSelectDangerOpen, setIsBoxSelectDangerOpen] = useState(false);
  const [isReportWindowInputOpen, setIsReportWindowInputOpen] = useState(false);
  const [reportDescriptionInput, setReportDescriptionInput] = useState([]);
  const [isBoxWithDoneMsgOpen, setIsBoxWithDoneMsgOpen] = useState(false) 

  
  
  /*image Upload*/
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');



  
  
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

const handleCloseNewReportWindow = () => {
  setIsReportWindowInputOpen(false)
}

const handleDangerDescriptionInputs = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setReportDescriptionInput((values) => ({ ...values, [name]: value }));
  setNumberOfCharacters(event.target.value.length);
};


const handleFileInputChange = (e) => {
  const file = e.target.files[0];
  previewFile(file);
  setSelectedFile(file);
  setFileInputState(e.target.value);
};

const previewFile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
      setPreviewSource(reader.result);
  };
};

const handleSubmitFile = (e) => {
  e.preventDefault();
  if (!selectedFile) return;
  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onloadend = () => {
      uploadImage(reader.result);
  };
  reader.onerror = () => {
      console.error('AHHHHHHHH!!');
      setErrMsg('something went wrong!');
  };
};


const uploadImage = async (base64EncodedImage) => {
console.log(base64EncodedImage);
try {
    await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
    });
    setFileInputState('');
    setPreviewSource('');
    setSuccessMsg('Image uploaded successfully');
    console.log(previewSource);

} catch (err) {
    console.error(err);
    setErrMsg('Something went wrong!');
}

};


const findCategoryID = [issueType.find((element) => element.type === dangerType)]
  
const dangerFormSubmit = (event) => {
  event.preventDefault();
  if (reportDescriptionInput.length === 0 || voting === "") {
    setAlertMsg(true);
  } else {
    Axios.post("http://localhost:4000/reports/", {
      voting: voting,
      lat: marker.lat,
      lng: marker.lng,
      title: dangerType,
      information: reportDescriptionInput.description,
      category_id: findCategoryID[0].nb,
      /*image: previewSource,*/
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

const handleEditRateBtn = () => {
  setIsVotingBoxOpen(true)
  getVotedSpots()
}

/*Flow to watch a single spot informations*/
const [sendReportRequest, setSendReportRequest] = useState(false);
const [getReportData, setGetReportdata] = useState([]);
const [isBoxShowInputDetailsOpen, setIsBoxShowInputDetailsOpen] = useState(false);
const [isReportIssueBoxOpen, setIsReportIssueBoxOpen] = useState(false)
const [isVotingBoxOpen, setIsVotingBoxOpen] = useState(false);
const [currentUser, setCurrentUser] = useState([])
const [isSpotVoted, setIsSpotVoted] = useState(false)
const [votedReports, setVotedReports] = useState([]);
const [loginId, setLoginId] = useState();

const getVotedSpots = async () => {
  try {
  /*   user = JSON.parse(localStorage.getItem("user-info")); */

    if (user) {
      if (user) {
        await setLoginId(user.id);
      }
      await Axios.get(`http://localhost:4000/users/rated`).then(
        (response) => {
          console.log(response.data);
         
          return setVotedReports(response.data);
        }
      );
    } else {
      console.log("there is not user yet ");
    }
  } catch (err) {
    console.log(err);
    setVotedReports([])
  }
};



const fetchReportData = async (fMarker) => {
  setSendReportRequest(true);
  try {
    const reportData = await Axios(
      `http://localhost:4000/reports/${fMarker.id}`
    );
    setGetReportdata(reportData.data[0]);
    getCurrentUser()
    console.log(getReportData)
    setSendReportRequest(false);
    setSelected("");
  } catch (e) {
    setSendReportRequest(false);
  }
};

const getCurrentUser = async () => { 
  try{
    await Axios.get("http://localhost:4000/users/current").then(
      (response) => { 
        setCurrentUser(response.data.id)
      }
    )

  } catch (err){ console.log(err)}
}


const handleBoxShowInputDetailsState = () => {
  setIsBoxShowInputDetailsOpen(false)
}

const handleReportIssueWindow = () => {
  setIsReportIssueBoxOpen(true)
}

const handleReportIssueSubmit = (event) => {
  event.preventDefault();
  setIsBoxWithDoneMsgOpen(true)
}

let user = document.cookie

const handleAddVote = async (event) => {
  event.preventDefault();
  const findReportID = votedReports.find(({id}) => id == getReportData.id)
  if (currentUser === getReportData.user_id || (currentUser !== getReportData.user && findReportID)){
    await Axios.put(
      `http://localhost:4000/reports/${getReportData.id}/vote`, {
        voting: voting,
        report_id: getReportData.id,
      })
      .then((response) => {
        setAlertMsg(false);
        setIsBoxWithDoneMsgOpen(true)
        setIsSpotVoted(true)
      })
  } 
  else {
    await Axios.post(`http://localhost:4000/reports/${getReportData.id}/vote`, {
      voting: voting,
      report_id: getReportData.id,
    })
      .then((response) => {
        setAlertMsg(false);
        setIsBoxWithDoneMsgOpen(true)
        console.log(response)
    })
    }
}


  const handleDangerChoice = (event) => {
    console.log("this aint working chief");
    return setDangerType(event.target.value);
  };

  const handleDangerLevel = (event) => {
    setVoting(event.target.value);
  };

  /*Box for both flows*/
  const showSubmittedReport = () => {
    setIsBoxWithDoneMsgOpen(false)
    setIsReportWindowInputOpen(false)
    setIsReportIssueBoxOpen(false)
    setIsBoxShowInputDetailsOpen(false)
    setIsVotingBoxOpen(false)
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
        currentUser,
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
        isSpotVoted,
        isVotingBoxOpen,
        isReportWindowInputOpen,
        isBoxSelectDangerOpen,
        handleAddVote,
        handleBoxShowInputDetailsState,
        handleCloseNewReportWindow,
        handleDangerChoice,
        handleDangerDescriptionInputs,
        handleDangerSubmit,
        handleDangerLevel,
        handleEditRateBtn,
        handleReportIssueWindow,
        handleReportIssueSubmit,
        handleWelcomeStatusClick,
        

        handleSubmitFile,
        handleFileInputChange,
        fileInputState,
        previewSource,
        selectedFile,
        successMsg,
        errMsg,
        
        
        
        options,
        isBoxShowInputDetailsOpen,
        isBoxWithDoneMsgOpen,
        isReportIssueBoxOpen,
        reportDescriptionInput,
        setIsBoxShowInputDetailsOpen,
        setVotedReports,
        setVoting,
        setIsVotingBoxOpen,
        showSubmittedReport,
        voting,
        votedReports,
        email,
        setEmail,
        password,
        setPassword,
        
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

export { MapProvider }
