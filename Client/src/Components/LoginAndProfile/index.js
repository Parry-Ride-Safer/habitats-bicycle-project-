import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGlobalMapContext } from "../../Context/mapContext";
import "./style.css";
import profileLogo from "./ProfileIcon.png";
import { ReactComponent as AccountIcon } from "./Vector.svg";
import { ReactComponent as WelcomeIcon } from "../../icons/modalBoxIcons/welcome.svg";
import { ReactComponent as SignIcon } from "../../icons/modalBoxIcons/signup.svg";
import { ReactComponent as PreviousArrow } from "../../icons/modalBoxIcons/previousArrow.svg";
import { ReactComponent as ConstructionSign } from "../../icons/modalBoxIcons/constructionSign.svg";
import { ReactComponent as ConstructionSign2 } from "../../icons/modalBoxIcons/constructionSign2.svg";
import { ReactComponent as BikelaneSign } from "../../icons/modalBoxIcons/bikeIcon.svg";
import { ReactComponent as BikelaneSign2 } from "../../icons/modalBoxIcons/bikeIcon2.svg";
import { ReactComponent as TrafficIcon } from "../../icons/modalBoxIcons/trafficIcon.svg";
import { ReactComponent as TrafficIcon2 } from "../../icons/modalBoxIcons/trafficIcon2.svg";
import { ReactComponent as BadParking } from "../../icons/modalBoxIcons/badParking.svg";
import { ReactComponent as BadParking2 } from "../../icons/modalBoxIcons/badParking2.svg";
import { ReactComponent as BadRoadIcon } from "../../icons/modalBoxIcons/badRoadIcon.svg";
import { ReactComponent as BadRoadIcon2 } from "../../icons/modalBoxIcons/badRoadIcon2.svg";
import { ReactComponent as JunctionIcon } from "../../icons/modalBoxIcons/junctionIcon.svg";
import { ReactComponent as JunctionIcon2 } from "../../icons/modalBoxIcons/junctionIcon2.svg";
import { ReactComponent as OtherIcon } from "../../icons/modalBoxIcons/otherIcon.svg";
import { ReactComponent as OtherIcon2 } from "../../icons/modalBoxIcons/otherIcon2.svg";

import dangerLevel from "../../Data/dangerLevelToVote";
import issueType from "../../Data/dangerTypeSelection";

const LoginAndProfile = () => {
  const {
    email,
    setEmail,
    getReportData,
    dispatch,
    password,
    setPassword,
    fetchReportData,
    stateLogin,
    setStateLogin,
    closeReportWindow,
  } = useGlobalMapContext();

  const [btnState, setState] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  const [userStorage, setUserStorage] = useState(null);
  const [loginId, setLoginId] = useState();
  const [SubmitedReports, setSubmitedReports] = useState([]);
  const [welcomeStatus, setWelcomeStatus] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [votedReports, setVotedReports] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleshowEditPassword = () => {
    setShowEditPassword(!showEditPassword);
  };

  const handleshowEditEmail = () => {
    setShowEditEmail(!showEditEmail);
  };

  const closeEditWindows = () => {
    setShowEditEmail(false);
    setShowEditPassword(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
    HandleshowWelcomePage();
    setWelcomeStatus(false);
  };

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
    HandleshowWelcomePage();
    setWelcomeStatus(false);
  };

  const handleWelcomeStatusClick = () => {
    setWelcomeStatus(!welcomeStatus);
    setShowWelcomePage(false);
  };

  let user = document.cookie;

  Axios.defaults.withCredentials = true;

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleClick = () => {
    setState(!btnState);
    closeEditWindows();
    closeReportWindow();
  };

  const login = async () => {
    let item = { email, password };
    try {
      let result = await Axios.post(
        `${process.env.REACT_APP_API_ROUTE_URL}/auth/login`,
        item
      );
      localStorage.setItem("user-info", JSON.stringify(result.data));
      console.log(result, "total result do login");

      setPassword("");
      setEmail("");
      handleUserStorage();
      handleLoginStatus();
      getCurrentUser();
    } catch (err) {
      console.log(err);
    }
  };

  const register = async () => {
    let item = { email, password };
    try {
      if (email.length <= 0 || password.length < 8) {
        console.log("please enter something( email or password is missing) ");
      } else {
        let result = await Axios.post(
          `${process.env.REACT_APP_API_ROUTE_URL}/auth/register`,
          item
        );
        localStorage.setItem("user-info", JSON.stringify(result.data));

        setPassword("");
        setEmail("");
        handleUserStorage();
        handleLoginStatus();
        getCurrentUser();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editPassword = async () => {
    let item = {};
    try {
      if (password === confirmPassword) {
        item = { password };
      }
      await Axios.put(
        `${process.env.REACT_APP_API_ROUTE_URL}/users/current`,
        item
      );

      setPassword("");
      setEmail("");
      handleshowEditPassword();
      getCurrentUser();
      setConfirmPassword("");
      /*  handleUserStorage();
      handleLoginStatus(); */
    } catch (err) {
      console.log("passwords do not match!");
      console.log(err);
    }
  };

  const editEmail = async () => {
    let item = { email };
    try {
      await Axios.put(
        `${process.env.REACT_APP_API_ROUTE_URL}/users/current`,
        item
      );

      setEmail("");
      handleshowEditEmail();
      getCurrentUser();
      /*  handleUserStorage();
      handleLoginStatus(); */
    } catch (err) {
      console.log(err);
    }
  };

  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [filteredArray, setFilteredArray] = useState({});

  const handleShowDetailedReport = () => {
    setShowDetailedReport(!showDetailedReport);
  };

  const DetailedWindow = (props, func) => {
    return (
      <div className="detailed-report-window">
        {" "}
        <h1> TESTE WINDOW {props.information}</h1>
      </div>
    );
  };

  const getSubmitedReports = async () => {
    try {
      if (user) {
        await Axios.get(
          `${process.env.REACT_APP_API_ROUTE_URL}/users/reports/`
        ).then((response) => {
          console.log(response.data, "submited Reports array");
          return setSubmitedReports(response.data);
        });
      } else {
        console.log("not logged in");
      }
    } catch (err) {
      console.log(err);
      setSubmitedReports([]);
    }
  };

  const reportDetailsWindow = (id) => {
    fetchReportData({ id });
    dispatch({ type: "OPEN_MARKER_REPORT" });
    setShowDetailedReport(!showDetailedReport);
  };

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

  const getCurrentUser = async () => {
    try {
      await Axios.get(
        `${process.env.REACT_APP_API_ROUTE_URL}/users/current`
      ).then((response) => {
        console.log(response.data);
        setCurrentUser(response.data.email);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async (e) => {
    try {
      await Axios.get(`${process.env.REACT_APP_API_ROUTE_URL}/auth/logout/`);
      localStorage.clear();
      handleClick();
      setLoginId(null);
      setStateLogin(true);
      setShowWelcomePage(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserStorage = () => {
    setUserStorage(!userStorage);
  };

  const handleLoginStatus = () => {
    /* setStateLogin(!stateLogin);
    //  setShowForm(true) 
    setShowWelcomePage(false);
    setWelcomeStatus(!welcomeStatus)
    setShowRegisterForm(false) */
    setShowRegisterForm(false);
    setShowForm(false);
    HandleshowWelcomePage();
    setWelcomeStatus(true);
    setStateLogin(!stateLogin);
  };

  useEffect(() => {
    if (btnState === true) {
      setLoginId(user);
      getSubmitedReports();
      getVotedSpots();
    }
    console.log("useEffect is rerendering");
  }, [btnState]);

  useEffect(() => {
    getSubmitedReports();
  }, []);

  const [showWelcomePage, setShowWelcomePage] = useState(true);

  const HandleshowWelcomePage = () => {
    setShowWelcomePage(false);
  };
  const WelcomePage = () => {
    return showWelcomePage ? (
      <div>
        <div className="welcome-page-start">
          <WelcomeIcon className="welcome-hand" />
          <h3>
            Welcome rider. <br /> Let's make the streets safer together.
          </h3>
          <button onClick={handleWelcomeStatusClick} className="btn-start">
            Start
          </button>
        </div>
      </div>
    ) : null;
  };

  const handleSkipForNow = () => {
    HandleshowWelcomePage();
    setWelcomeStatus(false);
    setStateLogin(!stateLogin);
  };

  const SignUpPop = () => {
    return (
      <div>
        <div className="welcome-page-sign">
          <SignIcon className="welcome-hand" />
          <h3>sign up to be able to report or vote on a road issue.</h3>
          <button className="btn-start" onClick={handleShowRegisterForm}>
            sign up
          </button>
          <button onClick={handleShowForm} className="button-login">
            login
          </button>
          <button
            onClick={handleSkipForNow}
            className="clear-button-register"
          ></button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!user ? (
        <>
          {!showWelcomePage ? (
            <AccountIcon className="account-icon" onClick={handleLoginStatus} />
          ) : null}
          <WelcomePage />
          {welcomeStatus ? !stateLogin ? <SignUpPop /> : null : null}
          {/* ---------- from here is login form ------------- */}
          {showForm && !stateLogin ? (
            <div className="register-form">
              <form className="sign-up-form">
                <h2 className="signup-title">Email Sign-in</h2>
                <div>
                  <label htmlFor="username">Email Address</label>
                  <br />
                  <input
                    className="sign-up-input"
                    type="email"
                    name="username"
                    placeholder="email@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    className="sign-up-input"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button onClick={login} type="button" className="btn-register">
                  Login
                </button>
                <button
                  onClick={handleSkipForNow}
                  type="button"
                  className="clear-button-register"
                ></button>
              </form>
            </div>
          ) : null}
          {/* ------- from here is show register only form---------------------------- */}
          {showRegisterForm && !stateLogin ? (
            <div className="register-form">
              <form className="sign-up-form">
                <h2>Email Sign-up</h2>

                <div>
                  <label htmlFor="username">Email Address</label>
                  <br />
                  <input
                    className="sign-up-input"
                    type="email"
                    name="username"
                    placeholder="email@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <br />
                  <input
                    className="sign-up-input"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={register}
                  type="button"
                  className="btn-register"
                >
                  Confirm
                </button>

                <button
                  onClick={handleSkipForNow}
                  type="button"
                  className="clear-button-register"
                ></button>
              </form>
            </div>
          ) : null}
        </>
      ) : (
        // ----------------- from here is if user is logged in --------------------
        <>
          <div
            className={btnState ? "menu-btn open" : "menu-btn"}
            onClick={handleClick}
          >
            <div className="menu-btn__burger"></div>
          </div>
          <div className="absolute-container">
            <div
              className={btnState ? "open-profile" : "closed"}
              onClick={handleClick}
            >
              {" "}
            </div>
            <div className={btnState ? "tab-wrapper" : "closed"}>
              <h1 className="your-account">Your Account</h1>
              <div className="tab-container">
                <div className="bloc-tabs">
                  <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() =>
                      toggleTab(1) + getSubmitedReports() + closeEditWindows()
                    }
                  >
                    Submitted Spots
                  </button>
                  <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() =>
                      toggleTab(2) + getVotedSpots() + closeEditWindows()
                    }
                  >
                    Rated Spots
                  </button>
                  <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() =>
                      toggleTab(3) + getCurrentUser() + closeEditWindows()
                    }
                  >
                    Settings
                  </button>
                </div>

                <div className="content-tabs">
                  <div
                    className={
                      toggleState === 1 ? "content  active-content" : "closed"
                    }
                  >
                    <div className="submited-spots-padding">
                      {SubmitedReports.length > 0 ? (
                        SubmitedReports.map((report) => (
                          <div
                            className="your-spots-container"
                            onClick={() => reportDetailsWindow(report.id)}
                          >
                            <section
                              className="submited-reports-section"
                              key={report.id}
                            >
                              <span>
                                {report.image ? (
                                  <img
                                    className="img-div"
                                    src={report.image}
                                    alt=""
                                  />
                                ) : (
                                  <div className="img-div-empty"> No photo</div>
                                )}
                              </span>
                              <div className="title-text-div">
                                {report.category_id === 1 ? (
                                  <span id="danger-type-title">
                                    <ConstructionSign className="category-sign" />{" "}
                                    Construction
                                  </span>
                                ) : null}
                                {report.category_id === 2 ? (
                                  <span id="danger-type-title">
                                    <BadRoadIcon className="category-sign" />{" "}
                                    Road Damage
                                  </span>
                                ) : null}
                                {report.category_id === 3 ? (
                                  <span id="danger-type-title">
                                    <BadParking className="category-sign" /> Bad
                                    Parking
                                  </span>
                                ) : null}
                                {report.category_id === 4 ? (
                                  <span id="danger-type-title">
                                    <BikelaneSign className="category-sign" />{" "}
                                    Bike Lane
                                  </span>
                                ) : null}
                                {report.category_id === 5 ? (
                                  <span id="danger-type-title">
                                    <JunctionIcon className="category-sign" />{" "}
                                    Junction
                                  </span>
                                ) : null}
                                {report.category_id === 6 ? (
                                  <span id="danger-type-title">
                                    <TrafficIcon className="category-sign" />{" "}
                                    Traffic
                                  </span>
                                ) : null}
                                {report.category_id === 7 ? (
                                  <span id="danger-type-title">
                                    <OtherIcon className="category-sign" />{" "}
                                    Other
                                  </span>
                                ) : null}
                                <span id="information-text">
                                  {report.information}
                                </span>
                              </div>

                              {Number(report.voting).toFixed(2) >= 1 &&
                              Number(report.voting).toFixed(2) <= 1.29 ? (
                                <span className="danger-icon-place">
                                  {dangerLevel[0].icon}
                                  <span className="vote-count">
                                    {report.count}
                                  </span>
                                </span>
                              ) : null}
                              {Number(report.voting).toFixed(2) >= 1.3 &&
                              Number(report.voting).toFixed(2) <= 2.29 ? (
                                <span className="danger-icon-place">
                                  {dangerLevel[1].icon}
                                  <span className="vote-count">
                                    {report.count}
                                  </span>
                                </span>
                              ) : null}
                              {Number(report.voting).toFixed(2) >= 2.3 &&
                              Number(report.voting).toFixed(2) <= 3 ? (
                                <span className="danger-icon-place">
                                  {dangerLevel[2].icon}
                                  <span className="vote-count">
                                    {report.count}
                                  </span>
                                </span>
                              ) : null}

                              {/* <span> category :  {report.category_id } </span> */}

                              {/*  <span> created : {report.createdAt}</span> */}
                            </section>
                          </div>
                        ))
                      ) : (
                        <p> you haven't Submitted any reports yet :D</p>
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      toggleState === 2 ? "content  active-content" : "closed"
                    }
                  >
                    <div className="submited-spots-padding">
                      {votedReports.length > 0 ? (
                        votedReports.map((spot) => (
                          <div
                            className="your-spots-container"
                            onClick={() => reportDetailsWindow(spot.id)}
                          >
                            <section
                              className="submited-reports-section"
                              key={spot.id}
                            >
                              <span>
                                {spot.image ? (
                                  <img
                                    className="img-div"
                                    src={spot.image}
                                    alt=""
                                  />
                                ) : (
                                  <div className="img-div-empty"> No photo</div>
                                )}
                              </span>
                              <div className="title-text-div">
                                {spot.name === "Construction" ? (
                                  <span id="danger-type-title">
                                    <ConstructionSign2 className="category-sign" />{" "}
                                    Construction
                                  </span>
                                ) : null}
                                {spot.name === "Juction" ? (
                                  <span id="danger-type-title">
                                    <JunctionIcon2 className="category-sign" />{" "}
                                    Junction
                                  </span>
                                ) : null}
                                {spot.name === "Bike Lane" ? (
                                  <span id="danger-type-title">
                                    <BikelaneSign2 className="category-sign" />{" "}
                                    Bike Lane
                                  </span>
                                ) : null}
                                {spot.name === "Road Damage" ? (
                                  <span id="danger-type-title">
                                    <BadRoadIcon2 className="category-sign" />{" "}
                                    Road Damage
                                  </span>
                                ) : null}
                                {spot.name === "Traffic" ? (
                                  <span id="danger-type-title">
                                    <TrafficIcon2 className="category-sign" />{" "}
                                    Traffic
                                  </span>
                                ) : null}
                                {spot.name === "Bad Parking" ? (
                                  <span id="danger-type-title">
                                    <OtherIcon2 className="category-sign" />{" "}
                                    Other
                                  </span>
                                ) : null}
                                {spot.name === "Other" ? (
                                  <span id="danger-type-title">
                                    <BadParking2 className="category-sign" />{" "}
                                    Bad Parking
                                  </span>
                                ) : null}
                                <span id="information-text">
                                  {spot.information}
                                </span>
                              </div>

                              {Number(spot.voting).toFixed(2) >= 1 &&
                              Number(spot.voting).toFixed(2) <= 1.29 ? (
                                <span className="danger-icon-place">
                                  {dangerLevel[0].icon}
                                  <span className="vote-count">
                                    {spot.count}
                                  </span>
                                </span>
                              ) : null}
                              {Number(spot.voting).toFixed(2) >= 1.3 &&
                              Number(spot.voting).toFixed(2) <= 2.29 ? (
                                <span className="danger-icon-place">
                                  {dangerLevel[1].icon}
                                  <span className="vote-count">
                                    {spot.count}
                                  </span>
                                </span>
                              ) : null}
                              {Number(spot.voting).toFixed(2) >= 2.3 &&
                              Number(spot.voting).toFixed(2) <= 3 ? (
                                <span className="danger-icon-place">
                                  {dangerLevel[2].icon}
                                  <span className="vote-count">
                                    {spot.count}
                                  </span>
                                </span>
                              ) : null}
                            </section>
                          </div>
                        ))
                      ) : (
                        <p> you haven't rated any reports yet :D</p>
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      toggleState === 3 ? "content  active-content" : "closed"
                    }
                  >
                    <div className="settings-container">
                      <div className="edit-container">
                        <div className="div-h3">
                          <span>E-Mail Address</span>
                          <div className="email-box">
                            <h3>{currentUser}</h3>
                          </div>
                        </div>
                        <button
                          onClick={handleshowEditEmail}
                          type="button"
                          className="button-edit"
                        >
                          edit
                        </button>
                      </div>
                      <div className="edit-container-password">
                        <div className="div-h3-password">
                          <span>Password</span>
                          <h3> ******** </h3>
                        </div>

                        <button
                          onClick={handleshowEditPassword}
                          type="button"
                          className="button-edit-password"
                        >
                          edit
                        </button>
                      </div>

                      <button
                        onClick={logout}
                        type="button"
                        className="btn-logout"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------------- from here is the edit password window------ */}
          {showEditPassword ? (
            <div className="edit-Form-password">
              <form className="form-group-edit">
                <div>
                  <label htmlFor="password">New Password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password">Confirm new Password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={editPassword}
                  type="button"
                  className="btn-save"
                >
                  Save
                </button>
                <PreviousArrow
                  onClick={handleshowEditPassword}
                  className="previous-arrow"
                />
              </form>
            </div>
          ) : null}
          {/* ----------- from here is the edit email window ------------- */}
          {showEditEmail ? (
            <div className="edit-Form-password">
              <form className="form-group-edit">
                <div>
                  <label htmlFor="username">New E-Mail address:</label>
                  <br />
                  <input
                    type="email"
                    name="username"
                    placeholder="email@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button onClick={editEmail} type="button" className="btn-save">
                  Save
                </button>
                {/*  <button
                  onClick={handleshowEditEmail}
                  type='button'
                  className='clear-button-edit'
                >  </button> */}
                <PreviousArrow
                  onClick={handleshowEditEmail}
                  className="previous-arrow"
                />
              </form>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default LoginAndProfile;
