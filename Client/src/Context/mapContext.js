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
import reportIssueOptions from "../Data/reportIssueOptions";

const MapContext = createContext();

const createReportInitialState = {
  isBoxWithDoneMsgOpen: false,
  isBoxShowInputDetailsOpen: false,
  isReportIssueBoxOpen: false,
  isReportWindowInputOpen: false,
  isVotingBoxOpen: false,
  sendReportRequest: false,
};

const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, createReportInitialState);

  const [dangerType, setDangerType] = useState();
  const [marker, setMarker] = useState();
  const [finalMarkers, setFinalMarkers] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      const result = await Axios(
        `${process.env.REACT_APP_API_ROUTE_URL}/location`
      );
      setFinalMarkers(result.data);
    };
    fetchMarkers();
  }, [state]);

  const [reportIssue, setReportIssue] = useState();
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
  const [image, setImage] = useState("");

  /* selected issues  */
  const [selectedIssue, setSelectIssue] = useState(null);

  const onMapClick = useCallback((event) => {
    dispatch({ type: "START_REPORT" });
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    });
    setImage("");
    setLoading(false);
  }, []);

  const findCategoryID = [
    issueType.find((element) => element.type === dangerType),
  ];

  const dangerFormSubmit = (event) => {
    event.preventDefault();
    if (voting === "" || image.length === 0 || dangerType.length === 0) {
      setAlertMsg(true);
    } else {
      Axios.post(`${process.env.REACT_APP_API_ROUTE_URL}/reports/`, {
        voting: voting,
        lat: marker.lat,
        lng: marker.lng,
        title: dangerType,
        information: reportDescriptionInput.description,
        category_id: findCategoryID[0].nb,
        image: image,
      })
        .then((response) => {
          console.log(response);
          setAlertMsg(false);
          setFinalMarkers((finalMarkers) => [
            ...finalMarkers,
            { ...marker, id: response.data.id },
          ]);

          dispatch({ type: "SUBMIT_REPORT" });
          setVoting("");
          setReportDescriptionInput([]);
          setImage("");
          setSelectIssue(null);
        })
        .catch((err) => console.log(err));
    }
  };

  const reportProcessDone = () => dispatch({ type: "CONCLUDE_PROCESS" });

  const createComplain = () => dispatch({ type: "OPEN_COMPLAIN_WINDOW" });

  const closeReportWindow = () => {
    setSelectIssue(null);
    dispatch({ type: "CLOSE_REPORT_WINDOW" });
  };

  const handleFlagOption = (event) => {
    setReportIssue(event.target.value);
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

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "habitat_bike_upload");
    setLoading(true);

    const res = await fetch(
      "http://api.cloudinary.com/v1_1/dc1bhahph/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  /*Flow to watch a single spot informations*/
  const [sendReportRequest, setSendReportRequest] = useState(false);
  const [getReportData, setGetReportdata] = useState([]);

  const [currentUser, setCurrentUser] = useState([]);
  const [isSpotVoted, setIsSpotVoted] = useState(false);
  const [votedReports, setVotedReports] = useState([]);
  const [loginId, setLoginId] = useState();

  const getVotedSpots = async () => {
    try {
      if (user) {
        if (user) {
          await setLoginId(user.id);
        }
        await Axios.get(
          `${process.env.REACT_APP_API_ROUTE_URL}/users/rated`
        ).then((response) => {
          console.log(response.data);
          return setVotedReports(response.data);
        });
      } else {
        console.log("there is not user yet ");
      }
    } catch (err) {
      console.log(err);
      setVotedReports([]);
    }
  };

  const fetchReportData = async (fMarker) => {
    dispatch({ type: "SEND_REPORT_REQUEST" });
    try {
      const reportData = await Axios(
        `${process.env.REACT_APP_API_ROUTE_URL}/reports/${fMarker.id}`
      );
      setGetReportdata(reportData.data);
      getCurrentUser();
      dispatch({ type: "REPORT_REQUEST_CONCLUDE" });
      setSelected("");
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentUser = async () => {
    try {
      await Axios.get(
        `${process.env.REACT_APP_API_ROUTE_URL}/users/current`
      ).then((response) => {
        setCurrentUser(response.data.id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  let user = document.cookie;
  const findReportID = votedReports.find(({ id }) => id == getReportData.id);

  const handleAddVote = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
      if (
        currentUser === getReportData.user_id ||
        (currentUser !== getReportData.user && findReportID)
      ) {
        await Axios.put(
          `${process.env.REACT_APP_API_ROUTE_URL}/reports/${getReportData.id}/vote`,
          {
            voting: voting,
            report_id: getReportData.id,
          }
        ).then((response) => {
          console.log(response);
          setAlertMsg(false);
          dispatch({ type: "SUBMIT_VOTE" });
          setIsSpotVoted(true);
          fetchReportData();
        });
      } else {
        await Axios.post(
          `${process.env.REACT_APP_API_ROUTE_URL}/reports/${getReportData.id}/vote`,
          {
            voting: voting,
            report_id: getReportData.id,
          }
        ).then((response) => {
          setAlertMsg(false);
          dispatch({ type: "SUBMIT_VOTE" });
        });
      }
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [state.isBoxWithDoneMsgOpen]);

  const handleDangerLevel = (event) => {
    setVoting(event.target.value);
  };

  const handleDangerType = (event) => {
    setDangerType(event.target.value);
  };

  const findFlagOption = reportIssueOptions.find(
    (element) => element.title === reportIssue
  );

  const submitComplain = async (event) => {
    event.preventDefault();
    try {
      await Axios.post(
        `${process.env.REACT_APP_API_ROUTE_URL}/reports/${getReportData.id}/flag`,
        {
          user_id: currentUser,
          report_id: getReportData.id,
          flag: findFlagOption.option,
        }
      ).then((response) => {
        console.log(response);
        dispatch({ type: "SUBMIT_COMPLAIN" });
      });
    } catch (err) {}
  };

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
    mapRef.current.setZoom(18);
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
        handleFlagOption,
        submitComplain,
        handleWelcomeStatusClick,
        reportIssue,
        uploadImage,
        loading,
        image,
        fetchReportData,
        findReportID,
        createComplain,
        options,
        reportDescriptionInput,
        sendReportRequest,
        setVotedReports,
        setVoting,
        voting,
        votedReports,
        email,
        setEmail,
        password,
        setPassword,
        getReportData,
        sendReportRequest,
        stateLogin,
        setStateLogin,
        handleDangerType,
        selectedIssue,
        setSelectIssue,
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
