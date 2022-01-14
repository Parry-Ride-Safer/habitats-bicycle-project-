import React, { useState, useEffect } from "react";
import "./navbar.css";
import Axios from "axios";
import { useGlobalMapContext } from "../../Context/mapContext";
const Navbar = () => {
  const [btnState, setState] = useState(false);
  // const [log2, setLog2] = useState()
  // const [info, setinfo] = useState([]);
  const [toggleState, setToggleState] = useState(1);

  const [user, setUser] = useState([]);

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

  let userStorage = JSON.parse(localStorage.getItem("user-info"));
  const getInfo = () => {
    Axios.get(`http://localhost:4000/users/${log}/reports/`).then(
      (response) => {
        console.log(response.data);
        setinfo(response.data);
      }
    );
  };

  const getUser = () => {
    Axios.get(`http://localhost:4000/users/${log}`).then((response) => {
      console.log(response.data);
      setUser(response.data.email);
    });
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleClick = () => {
    setState(!btnState);
  };

  /*  useEffect(() => {
    getInfo();
  }, []); */

  return (
    <>
      <div
        className={btnState ? "menu-btn open" : "menu-btn"}
        onClick={handleClick}
      >
        <div className="menu-btn__burger"></div>
      </div>
      <div>
        <div
          className={btnState ? "open-profile" : "closed"}
          onClick={handleClick}
        >
          {" "}
        </div>
        <div className={btnState ? "tab-wrapper" : "closed"}>
          <div className="tab-container">
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1) + getUser()}
              >
                Info
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2) + getInfo()}
              >
                Your spots
              </button>
              <button
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3)}
              >
                Spots Rated
              </button>
            </div>

            <div className="content-tabs">
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "closed"
                }
              >
                <h2>your Profile</h2>
                <hr />
                <h3>user information:</h3>
                <p> {userStorage ? userTest : null} </p>
              </div>

              <div
                className={
                  toggleState === 2 ? "content  active-content" : "closed"
                }
              >
                <h2>your spots</h2>
                <hr />

                <div>
                  {userStorage
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
                    : null}
                </div>
              </div>

              <div
                className={
                  toggleState === 3 ? "content  active-content" : "closed"
                }
              >
                <h2>spots rated</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                  sed nostrum rerum laudantium totam unde adipisci incidunt modi
                  alias! Accusamus in quia odit aspernatur provident et ad vel
                  distinctio recusandae totam quidem repudiandae omnis veritatis
                  nostrum laboriosam architecto optio rem, dignissimos
                  voluptatum beatae aperiam voluptatem atque. Beatae rerum
                  dolores sunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
