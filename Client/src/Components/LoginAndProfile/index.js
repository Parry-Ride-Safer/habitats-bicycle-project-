import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGlobalMapContext } from "../../Context/mapContext";
import "./style.css";
import profileLogo from "./ProfileIcon.png";
import WelcomePage from "./welcomePage";


const LoginAndProfile = () => {
  const {
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
    stateLogin,
    setStateLogin,
  } = useGlobalMapContext();
  /*  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userTest, setUserTest] = useState([]);
  const [log, setLog] = useState("");
  const [infoTest, setinfoTest] = useState([]); */
  const [btnState, setState] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  const [userStorage, setUserStorage] = useState(null);
  const [loginId, setLoginId] = useState();
  const [SubmitedReports, setSubmitedReports] = useState([]);
  const [welcomeStatus,setWelcomeStatus] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [votedReports, setVotedReports] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showRegisterForm,setShowRegisterForm] = useState(false);

  const handleshowEditPassword = ()=> {
    setShowEditPassword(!showEditPassword)
  }

  const handleshowEditEmail = ()=> {
    setShowEditEmail(!showEditEmail)
  }


  const handleShowForm = () => { 
      setShowForm(true)
      HandleshowWelcomePage();
      setWelcomeStatus(false) ;
  }

  const handleShowRegisterForm = () => { 
    setShowRegisterForm(true)
    HandleshowWelcomePage();
    setWelcomeStatus(false) ;
}





const handleWelcomeStatusClick =() => { 
    setWelcomeStatus(!welcomeStatus)
}
console.log(document.cookie)
  let user = document.cookie /* JSON.parse(localStorage.getItem("user-info")); */

  Axios.defaults.withCredentials = true;
  
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleClick = () => {
    setState(!btnState);
  };

/*   const register = async () => {
    let item = { email, password };
    if (email.length <= 0 || password.length < 8) {
      console.log("please enter something( email or password is missing) ");
    } else {
      let result = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });
      result = await result.json();

      localStorage.setItem("user-info", JSON.stringify(result));
      
      await handleUserStorage();
      await handleLoginStatus();
    }
  }; */

  /* const handleRegister = () => {
    if (email <= 0 || password <= 0) {
      console.log("please enter something( email or password is missing) ");
    } else if (password < 8) {
      console.log(
        "please enter a valid password need to be at least 8 characters"
      );
    } else {
      register();
    }
  }; */

  /* const login = async () => {
    user = JSON.parse(localStorage.getItem("user-info"));
    let item = { email, password };
    let result = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });

    result = await result.json();
    await localStorage.setItem("user-info", JSON.stringify(result));

    await console.log()
    handleUserStorage();
    handleLoginStatus();
  }; */

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
      
     

      await console.log(result.data.id, "user id logged");
      await setLoginId(result.data.id);
      await console.log(loginId, " agora sim");
    } catch (err) {
      console.log(err);
    }
  };

  const register2 = async () => {
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

      await console.log(result.data.id, "user id logged");
      await setLoginId(result.data.id);
      await console.log(loginId, " agora sim");};
      
    } catch (err) {
      console.log(err);
    }
  };

  const editPassword = async () => {
    let item = { }; 
    try {

      if(password === confirmPassword ){ item = {password}}
      let result = await Axios.put(`http://localhost:4000/users/current`, item);
      /* localStorage.setItem("user-info", JSON.stringify(result.data)); */
      console.log(result, "total result do login");
      
      setPassword("");
      setEmail("");
      handleshowEditPassword();
      getCurrentUser();
      setConfirmPassword('')
     /*  handleUserStorage();
      handleLoginStatus(); */
      
      
     

    } catch (err) {
      console.log('passwords do not match!')
      console.log(err);
    }
  };

  const editEmail = async () => {
    let item = {email};
    try {

      let result = await Axios.put(`http://localhost:4000/users/current`, item);
      
      console.log(result, "total result do login");
      
     
      setEmail("");
      handleshowEditEmail();
      getCurrentUser();
     /*  handleUserStorage();
      handleLoginStatus(); */
      
      
     

    } catch (err) {
      console.log(err);
    }
  };

  

 /*  const editAccount = async () => {
    let item = { email, password };
    let result = await fetch(`http://localhost:4000/users/${loginId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });

    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
  }; */


  const getSubmitedReports = async () => {
    try {
    /*   user = JSON.parse(localStorage.getItem("user-info")); */

      if (user) {
        if (user) {
          await setLoginId(user.id);
        }

        await Axios.get(`http://localhost:4000/users/reports/`).then(
          (response) => {
            console.log(response.data);
            console.log(user.id, "este é o user id do storage");
            return setSubmitedReports(response.data);
          }
        );
      } else {
        console.log("there is not user yet ");
      }
    } catch (err) {
      console.log(err);
      setSubmitedReports([])
    }
  };
  
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

  const getCurrentUser = async () => { 
    try{
      await Axios.get(`http://localhost:4000/users/current`).then(
        (response) => { 
          console.log(response.data)
          setCurrentUser(response.data.email)
        }
      )

    } catch (err){ console.log(err)}
  }





  const logout = async (e) => {
    try {
      await Axios.get(`http://localhost:4000/auth/logout/`)
      localStorage.clear();
      handleClick();
      setLoginId(null);
      setStateLogin(true);
      setShowWelcomePage(false);

    } catch (err) {
      console.log(err);
    }
  };

  


  function isLogged(user) {
    user = JSON.parse(localStorage.getItem("user-info"));

    if (user && user.id) {
      return user.email;
    } else {
      return null;
    }
  }
  const handleUserStorage = () => {
    setUserStorage(!userStorage);
  };

  const handleLoginStatus = () => {
    /* setStateLogin(!stateLogin);
    //  setShowForm(true) 
    setShowWelcomePage(false);
    setWelcomeStatus(!welcomeStatus)
    setShowRegisterForm(false) */
    setShowRegisterForm(false) 
    setShowForm(false) 
    HandleshowWelcomePage();
    setWelcomeStatus(true) ;
    setStateLogin(!stateLogin);
    
    

  };
  

 /*  useEffect(()=>{

console.log('useffect rerendering on stateLogin')

  },[stateLogin]) */
  const savedLogged = isLogged(user);

  useEffect(() => {
    /* const response = async () => {
      await console.log(user, "novo render user");
      await setLoginId(user);
      await console.log(loginId);
    };

    console.log("useEffect is rerendering");

    response();
    console.log(loginId, " LOOOOOGIN"); */
    if (btnState === true) {
      setLoginId(user);
      getSubmitedReports();
    }
    console.log("useEffect is rerendering");
    console.log(loginId, "useffect loginID");
  }, [btnState]);

  useEffect(() => {
    getSubmitedReports();
    console.log("SEGUNDO USEEFFECT DO USER");
  }, []);

const [showWelcomePage, setShowWelcomePage] = useState(true)

const HandleshowWelcomePage =() => { 
    setShowWelcomePage(false)
}
  const WelcomePage2 = () => {
    return ( showWelcomePage ? ( <div>
            <div className='welcome-page2'>
                <h2>Welcome rider. <br/> Let's make the streets safer together.</h2>
                <button onClick={handleWelcomeStatusClick} className='btn'>Start</button>
            </div>
        </div>) : null 
       
    )
}

const handleSkipForNow = ()=> { 
    
    HandleshowWelcomePage();
    setWelcomeStatus(false) ;
    setStateLogin(!stateLogin);
    
}

const SignUpPop = () => {
    return (
        <div>
            <div className='welcome-page'>
                <h2>sign up to be able to report or vote on a road issue.</h2>
                <button className='btn' onClick={handleShowRegisterForm} >sign up</button>
                <button onClick={handleShowForm}>log in</button>
                <button onClick={handleSkipForNow}>skip for now</button>
            </div>
        </div>
    )
}

const ReportDetailsWindow = () => { 
  return (
    <div>


    </div>
  )
}


  return (
    <div>
         
     
      {!user ? (
        <>
        {!showWelcomePage ? (<button onClick={handleLoginStatus} className="login-btn">
            <img src={profileLogo} alt="" className="img-login-btn" />
          </button>) : null}
        <WelcomePage2 />
        {welcomeStatus ? !stateLogin ? <SignUpPop /> : null : null}
        {showForm && !stateLogin  ? (<div className="login-form">
                
                <form>
                <h2>Email Sign-in</h2>
                  <div>
                    <label htmlFor="username">email</label>
                    <input
                      type="email"
                      name="username"
                      placeholder="email@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button onClick={login} type="button" className="btn">
                    Login
                  </button>
                  <button onClick={handleSkipForNow }  type="button" className="btn">
                    close
                  </button>
                 
                </form>
              </div>) : null }
{/* ------- from here is show register only form---------------------------- */}
              {showRegisterForm && !stateLogin  ? (<div className="register-form">
                
                <form>
                  <h2>Email Sign-up</h2>
                  <div>
                    <label htmlFor="username">Email Address</label>
                    <input
                      type="email"
                      name="username"
                      placeholder="email@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button onClick={register2} type="button" className="btn">
                      Register
                    </button>
                  
                  
                  <button onClick={handleSkipForNow }  type="button" className="btn">
                    close
                  </button>
                 
                </form>
              </div>) : null }
        {/*{stateLogin ? ( 
            { <div className="login-form">
                
              <form>
                <div>
                  <label htmlFor='username'>email</label>
                  <input
                    type='email'
                    name='username'
                    placeholder='email@example.com'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    name='password'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button onClick={login} type='button' className='btn'>
                  Login
                </button>
                <button onClick={logout} type='button' className='btn'>
                  Logout
                </button>
                {!localStorage.getItem("user-info") ? (
                  <button onClick={register} type='button' className='btn'>
                    Register
                  </button>
                ) : null}
                <div>
                  {localStorage.getItem("user-info") ? (
                    <button>get info</button>
                  ) : null}
                </div>
              </form>
            </div> 
                  ) : null} */}
         
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
              <h3 className='your-account'>Your Account</h3>
              <div className='tab-container'>
                <div className='bloc-tabs'>
                  <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1) + getSubmitedReports()}
                  >
                    Submitted Spots
                  </button>
                  <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2) + getVotedSpots()}
                  >
                    Rated Spots
                  </button>
                  <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3) + getCurrentUser()}
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
                      {SubmitedReports.length > 0 ?( SubmitedReports.map((contact) => (
                        <div className='your-spots-container'>
                          <ul key={contact.id}>
                            <li>
                              <span className='img-div'>img </span>
                            </li>
                            <li> information :{contact.information}</li>
                            <li> voting : {contact.voting}</li>
                            <li> category : {contact.category_id}</li>
                          </ul>
                        </div>
                      ))): <p> you haven't Submitted any reports yet :D</p>}
                    </div>
                  </div>

                  <div
                    className={
                      toggleState === 2 ? "content  active-content" : "closed"
                    }
                  >
                    <h2>your spots</h2>

                    <hr />

                    <div>
                    {votedReports.length > 0 ?( votedReports.map((spot) => (
                        <div className='your-spots-container'>
                          <ul key={spot.id}>
                            <li>
                              <span className='img-div'>img </span>
                            </li>
                            <li> information :{spot.information}</li>
                            <li> voting : {spot.voting}</li>
                            <li> category : {spot.name}</li>
                            <li> Created at : {spot.createdAt}</li>
                          </ul>
                        </div>
                      ))): <p> you haven't rated any reports yet :D</p>}
                    </div>
                  </div>

                  <div
                    className={
                      toggleState === 3 ? "content  active-content" : "closed"
                    }
                  >
                    <h2>Settings</h2>
                    <hr />
                    <h3>Your Account: {currentUser}</h3>
                    <button onClick={handleshowEditEmail } type="button" className="btn">
                      edit email
                    </button>
                    <h3>password: ****** </h3>
                    <button onClick={handleshowEditPassword } type="button" className="btn">
                      edit password
                    </button>

                    <button onClick={logout} type='button' className='btn'>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ----------------------- from here is the edit password window------ */}
          {showEditPassword ?( <div className="edit-Form-password">
              <form>
              <div className="form-group">
                    <label htmlFor="password">enter new Password:</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
              
                  <div className="form-group">
                    <label htmlFor="password">confirm new Password:</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button onClick={editPassword}  type="button" className="btn">
                    Save Changes
                  </button>
                  <button onClick={handleshowEditPassword} type="button" className="btn">
                    Close
                  </button>
                  
              </form>
          </div>) : null}
          {/* ----------- from here is the edit email window ------------- */}
          {showEditEmail?( <div className="edit-Form-password">
              <form className="form-group">
              <div>
                    <label htmlFor="username">enter new E-Mail address:</label>
                    <input
                      type="email"
                      name="username"
                      placeholder="email@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
              
                  
                  <button onClick={editEmail}  type="button" className="btn">
                    Save Changes
                  </button>
                  <button onClick={handleshowEditEmail} type="button" className="btn">
                    Close
                  </button>
                  
              </form>
          </div>) : null}
        </>
      )}
    </div>
  );
};

export default LoginAndProfile;
