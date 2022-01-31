import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGlobalMapContext } from "../../Context/mapContext";
import "./style.css";
import profileLogo from "./ProfileIcon.png";
// import WelcomePage from "./welcomePage";
import { ReactComponent as AccountIcon } from "./Vector.svg";
import { ReactComponent as DangerIcon } from "../../icons/modalBoxIcons/Group 550.svg";
import { ReactComponent as WelcomeIcon } from "../../icons/modalBoxIcons/welcome.svg";
import { ReactComponent as SignIcon } from "../../icons/modalBoxIcons/signup.svg";
import { ReactComponent as PreviousArrow} from "../../icons/modalBoxIcons/previousArrow.svg";




const LoginAndProfile = () => {
  const { email, setEmail, password, setPassword, stateLogin, setStateLogin } =
    useGlobalMapContext();

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

  const closeEditWindows =()=> { 
    setShowEditEmail(false);
    setShowEditPassword(false);
  }

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
    closeEditWindows()
  };

  const login = async () => {
    let item = { email, password };
    try {
      let result = await Axios.post("http://localhost:4000/auth/login", item);
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
          "http://localhost:4000/auth/register",
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
      await Axios.put(`http://localhost:4000/users/current`, item);

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
      await Axios.put(`http://localhost:4000/users/current`, item);

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
  const [filteredArray, setFilteredArray] = useState([]);

  const handleShowDetailedReport = () => {
    setShowDetailedReport(!showDetailedReport);
  };

  const DetailedWindow = (props) => {
    return (
      <div className='detailed-report-window'>
        {" "}
        <h1> TESTE WINDOW {props.information}</h1>
      </div>
    );
  };

  let filteredReport = [];
  const reportDetailsWindow = (id) => {
    filteredReport = SubmitedReports.filter((report) => report.id === id);
    let pleasework = filteredReport;
    setShowDetailedReport(!showDetailedReport);
    console.log(filteredReport[0], " variavel filt");
    console.log(pleasework[0], "works?");
    return pleasework;
  };

  const getSubmitedReports = async () => {
    try {
      if (user) {
        await Axios.get(`http://localhost:4000/users/reports/`).then(
          (response) => {
            console.log(response.data, "submited Reports array");
            return setSubmitedReports(response.data);
          }
        );
      } else {
        console.log("not logged in");
      }
    } catch (err) {
      console.log(err);
      setSubmitedReports([]);
    }
  };

  const getVotedSpots = async () => {
    try {
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

  const getCurrentUser = async () => {
    try {
      await Axios.get(`http://localhost:4000/users/current`).then(
        (response) => {
          console.log(response.data);
          setCurrentUser(response.data.email);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async (e) => {
    try {
      await Axios.get(`http://localhost:4000/auth/logout/`);
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
        <div className='welcome-page-start'>
          <WelcomeIcon className='welcome-hand' />
          <h3>
            Welcome rider. <br /> Let's make the streets safer together.
          </h3>
          <button onClick={handleWelcomeStatusClick} className='btn-start'>
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
        <div className='welcome-page-sign'>
          <SignIcon className='welcome-hand' />
          <h3>sign up to be able to report or vote on a road issue.</h3>
          <button className='btn-start' onClick={handleShowRegisterForm}>
            sign up
          </button>
          <button onClick={handleShowForm} className='button-login'>
            login
          </button>
          <button
            onClick={handleSkipForNow}
            className='clear-button-register'
          ></button>
        </div>
      </div>
    );
  };

  const handleDangerIcons = (props) => {
    let vote = Number(props.voting).toFixed(2);
  };

  return (
    <div className='teste2'>
      {!user ? (
        <>
          {!showWelcomePage ? (
            <AccountIcon className='account-icon' onClick={handleLoginStatus} />
          ) : null}
          <WelcomePage />
          {welcomeStatus ? !stateLogin ? <SignUpPop /> : null : null}
          {showForm && !stateLogin ? (
            <div className='register-form'>
              <form className='sign-up-form'>
                <h2>Email Sign-in</h2>
                <div>
                  <label htmlFor='username'>Email Address</label>
                  <br />
                  <input
                    className='sign-up-input'
                    type='email'
                    name='username'
                    placeholder='email@example.com'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <br />
                  <input
                    className='sign-up-input'
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button onClick={login} type='button' className='btn-register'>
                  Confirm
                </button>
                <button
                  onClick={handleSkipForNow}
                  type='button'
                  className='clear-button-register'
                ></button>
              </form>
            </div>
          ) : null}
          {/* ------- from here is show register only form---------------------------- */}
          {showRegisterForm && !stateLogin ? (
            <div className='register-form'>
              <form className='sign-up-form'>
                <h2>Email Sign-up</h2>

                <div>
                  <label htmlFor='username'>Email Address</label>
                  <br />
                  <input
                    className='sign-up-input'
                    type='email'
                    name='username'
                    placeholder='email@example.com'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <br />
                  <input
                    className='sign-up-input'
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={register}
                  type='button'
                  className='btn-register'
                >
                  Confirm
                </button>

                <button
                  onClick={handleSkipForNow}
                  type='button'
                  className='clear-button-register'
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
            <div className='menu-btn__burger'></div>
          </div>
          <div className='absolute-container'>
            <div
              className={btnState ? "open-profile" : "closed"}
              onClick={handleClick}
            >
              {" "}
            </div>
            <div className={btnState ? "tab-wrapper" : "closed"}>
              <h1 className='your-account'>Your Account</h1>
              <div className='tab-container'>
                <div className='bloc-tabs'>
                  <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1) + getSubmitedReports() + closeEditWindows()}
                  >
                    Submitted Spots
                  </button>
                  <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2) + getVotedSpots() + closeEditWindows()}
                  >
                    Rated Spots
                  </button>
                  <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3) + getCurrentUser() + closeEditWindows()}
                  >
                    Settings
                  </button>
                </div>

                <div className='content-tabs'>
                  <div
                    className={
                      toggleState === 1 ? "content  active-content" : "closed"
                    }
                  >
                    <h2>Submitted Spots:</h2>
                    <hr />

                    <div>
                      {SubmitedReports.length > 0 ? (
                        SubmitedReports.map((report) => (
                          <div
                            className='your-spots-container'
                            onClick={() => reportDetailsWindow(report.id)}
                          >
                            <ul key={report.id}>
                              <li>
                                <img
                                  className='img-div'
                                  src={report.image}
                                  alt=''
                                />
                              </li>
                              <li> information :{report.information}</li>
                              <li>
                                {" "}
                                voting : {Number(report.voting).toFixed(2)}
                                {<DangerIcon />}
                              </li>
                              <li> category : {report.category_id}</li>
                              <li> created : {report.createdAt}</li>
                            </ul>
                          </div>
                        ))
                      ) : (
                        <p> you haven't Submitted any reports yet :D</p>
                      )}
                    </div>
                    {/* {showDetailedReport ? (
                      <div className="detailed-report-window">
                        {" "}
                        <h1>
                          {" "}
                          TESTE WINDOW{" "}
                          {filteredReport.length > 0
                            ? filteredReport[0].id
                            : null}
                        </h1>
                      </div>
                    ) : null} */}
                  </div>

                  <div
                    className={
                      toggleState === 2 ? "content  active-content" : "closed"
                    }
                  >
                    <h2>your voted spots</h2>

                    <hr />

                    <div>
                      {votedReports.length > 0 ? (
                        votedReports.map((spot) => (
                          <div className='your-spots-container'>
                            <ul key={spot.id}>
                              <li>
                                <img
                                  className='img-div'
                                  src={spot.image}
                                  alt=''
                                />
                              </li>
                              <li> information :{spot.information}</li>
                              <li>
                                {" "}
                                voting : {Number(spot.voting).toFixed(2)}
                              </li>
                              <li> category : {spot.name}</li>
                              <li> Created at : {spot.createdAt}</li>
                            </ul>
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
                    <div className='settings-container'>
                    
                    <div className="edit-container">
                      <div className="div-h3">
                      <span>E-Mail Address</span>
                    <div className="email-box"> 
                      <h3>{currentUser}</h3></div>
                    </div>
                    <button
                      onClick={handleshowEditEmail}
                      type="button"
                      className="button-edit"
                    >
                    edit
                    </button>
                    </div >
                    <div className="edit-container-password">
                    <div className="div-h3-password">
                      <span>Password</span>
                      <h3> ******** </h3></div>
                    
                    <button
                      onClick={handleshowEditPassword}
                      type="button"
                      className="button-edit-password"
                    >
                      edit
                    </button>
                    </div>

                    <button onClick={logout} type='button' className='btn-logout'>
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
            <div className='edit-Form-password'>
              <form className='form-group-edit'>
                <div >
                  <label htmlFor='password'>New Password:</label>
                  <input
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div >
                  <label htmlFor='password'>Confirm new Password:</label>
                  <input
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button onClick={editPassword} type='button' className='btn-save'>
                  Save
                </button>
                <PreviousArrow  onClick={handleshowEditPassword} className='previous-arrow'/>
              </form>
            </div>
          ) : null}
          {/* ----------- from here is the edit email window ------------- */}
          {showEditEmail ? (
            <div className='edit-Form-password'>
              <form className='form-group-edit'>
                <div>
                  <label htmlFor='username'>New E-Mail address:</label>
                  <br/>
                  <input
                    type='email'
                    name='username'
                    placeholder='email@example.com'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button onClick={editEmail} type='button' className='btn-save'>
                  Save
                </button>
               {/*  <button
                  onClick={handleshowEditEmail}
                  type='button'
                  className='clear-button-edit'
                >  </button> */}
                <PreviousArrow  onClick={handleshowEditEmail} className='previous-arrow'/>
              </form>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default LoginAndProfile;
