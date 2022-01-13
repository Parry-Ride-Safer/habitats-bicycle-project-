import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGlobalMapContext } from "../../Context/mapContext";
import "./style.css";
import profileLogo from "./ProfileIcon.png";

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
  } = useGlobalMapContext();
  /*  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userTest, setUserTest] = useState([]);
  const [log, setLog] = useState("");
  const [infoTest, setinfoTest] = useState([]); */
  const [btnState, setState] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  const [stateLogin, setStateLogin] = useState(false);
  const [userStorage, setUserStorage] = useState(null);

  let user = JSON.parse(localStorage.getItem("user-info"));

  const handleUserStorage = () => {
    setUserStorage(!userStorage);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleClick = () => {
    setState(!btnState);
  };

  const register = async () => {
    let item = { email, password };
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
    handleUserStorage();
    handleLoginStatus();
  };

  const login = async () => {
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
    localStorage.setItem("user-info", JSON.stringify(result));
    handleUserStorage();
    handleLoginStatus();
  };

  const logout = async (e) => {
    try {
      localStorage.clear();
      handleClick();
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

  const handleLoginStatus = () => {
    setStateLogin(!stateLogin);
  };

  const savedLogged = isLogged(user);
  useEffect(() => {
    console.log("useEffect is rerendering");
  }, []);

  return (
    <div>
      {/* <div className="login-form">
        <form>
          <div>
            <label htmlFor="username">email</label>
            <input
              type="text"
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
          <button onClick={logout} type="button" className="btn">
            Logout
          </button>
          {!localStorage.getItem("user-info") ? (
            <button type="button" className="btn">
              Register
            </button>
          ) : null}
          <div>
            {localStorage.getItem("user-info") ? (
              <button>get info</button>
            ) : null}
           
          </div>
        </form>

        <h3>login name:</h3>
      </div> */}
      {!user ? (
        <>
          {stateLogin ? (
            <div className="login-form">
              <form>
                <div>
                  <label htmlFor="username">email</label>
                  <input
                    type="text"
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
                <button onClick={logout} type="button" className="btn">
                  Logout
                </button>
                {!localStorage.getItem("user-info") ? (
                  <button onClick={register} type="button" className="btn">
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
          ) : null}
          <button onClick={handleLoginStatus} className="login-btn">
            <img src={profileLogo} alt="" className="img-login-btn" />
          </button>
        </>
      ) : (
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
              <h3 className="your-account">Your Account</h3>
              <div className="tab-container">
                <div className="bloc-tabs">
                  <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                  >
                    Submitted Spots
                  </button>
                  <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                  >
                    Rated Spots
                  </button>
                  <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
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
                    <h2>Submitted Spots:</h2>
                    <hr />
                    <h3>user Logged: {savedLogged}</h3>
                    <img src={profileLogo} alt="" />
                  </div>

                  <div
                    className={
                      toggleState === 2 ? "content  active-content" : "closed"
                    }
                  >
                    <h2>your spots</h2>

                    <hr />

                    <div>
                      {/* {userStorage
                    ? info.map((contact) => (
                        <div className="your-spots-container">
                          <ul key={contact.id}>
                            <li>
                              <span className="img-div">img </span>
                            </li>
                            <li> information :{contact.information}</li>
                            <li> voting : {contact.voting}</li>
                            <li> category : {contact.category_id}</li>
                          </ul>
                        </div>
                      ))
                    : null} */}
                    </div>
                  </div>

                  <div
                    className={
                      toggleState === 3 ? "content  active-content" : "closed"
                    }
                  >
                    <h2>Settings</h2>
                    <hr />
                    <h3>Your Account: {savedLogged}</h3>
                    <h3>password: ****** </h3>
                    <button onClick={logout} type="button" className="btn">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginAndProfile;
