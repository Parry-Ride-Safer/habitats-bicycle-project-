import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import reducer from "./reducer";
import Axios from "axios";
import issueType from "../Data/dangerTypeSelection";

const MapContext = createContext();

const createReportInitialState = {
  isBoxWithDoneMsgOpen: false,
  isBoxShowInputDetailsOpen: false,
  isReportIssueBoxOpen: false,
  isReportWindowInputOpen: false,
  isVotingBoxOpen: false,
};

const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, createReportInitialState);

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

  const [welcomeStatus, setWelcomeStatus] = useState(false);
  const handleWelcomeStatusClick = () => {
    setWelcomeStatus(!welcomeStatus);
  };
  /*Flow to create a new Marker*/
  const [selected, setSelected] = useState(null);
  const [reportDescriptionInput, setReportDescriptionInput] = useState([]);

  /*image Upload*/

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState ("");

  // const [fileInputState, setFileInputState] = useState("");
  // const [previewSource, setPreviewSource] = useState("");
  // const [selectedFile, setSelectedFile] = useState();
  // const [successMsg, setSuccessMsg] = useState("");
  // const [errMsg, setErrMsg] = useState("");

  const onMapClick = useCallback((event) => {
    dispatch({ type: "START_REPORT" });
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    });
  }, []);

  const closeReportWindow = () => {
    dispatch({ type: "CLOSE_REPORT_WINDOW" });
  };

  const findCategoryID = [
    issueType.find((element) => element.type === dangerType),
  ];

  const dangerFormSubmit = (event) => {
    event.preventDefault();
    if (reportDescriptionInput.length === 0 || voting === "") {
      setAlertMsg(true);
    } else {
      // console.log(previewSource)
      Axios.post("http://localhost:4000/reports/", {
        voting: voting,
        lat: marker.lat,
        lng: marker.lng,
        title: dangerType,
        information: reportDescriptionInput.description,
        category_id: findCategoryID[0].nb,
        image: image,
        
      })
        .then((response) => {
          setAlertMsg(false);
          setFinalMarkers((finalMarkers) => [
            ...finalMarkers,
            { ...marker, id: response.data.id },
          ]);
          dispatch({ type: "SUBMIT_REPORT" });
          setImage("")
        })
        .catch((err) => console.log(err));
      setVoting("");
      setReportDescriptionInput([]);
    }
  };

  const reportProcessDone = () => {
    dispatch({ type: "CONCLUDE_PROCESS" });
  };

  const createComplain = () => {
    dispatch({ type: "OPEN_COMPLAIN_WINDOW" });
  };

  const submitComplain = (event) => {
    event.preventDefault();
    dispatch({ type: "SUBMIT_COMPLAIN" });
  };

  const openVoteWindow = () => {
    dispatch({ type: "OPEN_VOTE_WINDOW" });
    getVotedSpots();
  };

  const handleDangerDescriptionInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setReportDescriptionInput((values) => ({ ...values, [name]: value }));
    setNumberOfCharacters(event.target.value.length);
  };



 /*Image Upload Element  [parte do LINK CLOUDINARY  a mudar - dc1bhahph]*/

const uploadImage = async e => {
  const files = e.target.files
  const data = new FormData()
  data.append("file", files [0])
  data.append("upload_preset", "habitat_bike_upload")
  setLoading(true)

  const res = await fetch("http://api.cloudinary.com/v1_1/dc1bhahph/image/upload", {
    method: "POST",
    body:data



  })

  const file = await res.json()

  console.log(file)

  setImage(file.secure_url)
  setLoading(false)

}



  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   previewFile(file);
  //   setSelectedFile(file);
  //   setFileInputState(e.target.value);
  // };

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  // const handleSubmitFile = (e) => {
  //   e.preventDefault();
  //   if (!selectedFile) return;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(selectedFile);
  //   reader.onloadend = () => {
  //     uploadImage(reader.result);
  //   };
  //   reader.onerror = () => {
  //     console.error("AHHHHHHHH!!");
  //     setErrMsg("something went wrong!");
  //   };
  // };

  // const uploadImage = async (base64EncodedImage) => {
  //   console.log(base64EncodedImage);
  //   try {
  //     await fetch("/api/upload", {
  //       method: "POST",
  //       body: JSON.stringify({ data: base64EncodedImage }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     setFileInputState("");
  //     setPreviewSource("");
  //     setSuccessMsg("Image uploaded successfully");
  //     console.log(previewSource);
  //   } catch (err) {
  //     console.error(err);
  //     setErrMsg("Something went wrong!");
  //   }
  // };





  /*Flow to watch a single spot informations*/
  const [sendReportRequest, setSendReportRequest] = useState(false);
  const [getReportData, setGetReportdata] = useState([]);

  const [currentUser, setCurrentUser] = useState([]);
  const [isSpotVoted, setIsSpotVoted] = useState(false);
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
      setVotedReports([]);
    }
  };

  const fetchReportData = async (fMarker) => {
    setSendReportRequest(true);
    try {
      const reportData = await Axios(
        `http://localhost:4000/reports/${fMarker.id}`
      );
      setGetReportdata(reportData.data[0]);
      getCurrentUser();
      console.log(getReportData);
      setSendReportRequest(false);
      setSelected("");
    } catch (e) {
      setSendReportRequest(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      await Axios.get("http://localhost:4000/users/current").then(
        (response) => {
          setCurrentUser(response.data.id);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  let user = document.cookie;

  const handleAddVote = async (event) => {
    event.preventDefault();
    const findReportID = votedReports.find(({ id }) => id == getReportData.id);
    if (
      currentUser === getReportData.user_id ||
      (currentUser !== getReportData.user && findReportID)
    ) {
      await Axios.put(
        `http://localhost:4000/reports/${getReportData.id}/vote`,
        {
          voting: voting,
          report_id: getReportData.id,
        }
      ).then((response) => {
        setAlertMsg(false);
        dispatch({ type: "SUBMIT_VOTE" });
        setIsSpotVoted(true);
      });
    } else {
      await Axios.post(
        `http://localhost:4000/reports/${getReportData.id}/vote`,
        {
          voting: voting,
          report_id: getReportData.id,
        }
      ).then((response) => {
        setAlertMsg(false);
        dispatch({ type: "SUBMIT_VOTE" });
        console.log(response);
      });
    }
  };

  const handleDangerLevel = (event) => {
    setVoting(event.target.value);
  };

  const handleDangerType = (event) => {
    setDangerType(event.target.value)
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
        ...state,
        dispatch,
        createReportInitialState,
        alertMsg,
        closeReportWindow,
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
        openVoteWindow,
        reportProcessDone,
        handleAddVote,
        handleDangerDescriptionInputs,
        handleDangerLevel,
        submitComplain,
        handleWelcomeStatusClick,


        uploadImage,
        loading,
        image,
        // handleSubmitFile,
        // handleFileInputChange,
        // fileInputState,
        // previewSource,
        // selectedFile,
        // successMsg,
        // errMsg,


        
        createComplain,
        options,
        reportDescriptionInput,
        setVotedReports,
        setVoting,
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
        handleDangerType
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
