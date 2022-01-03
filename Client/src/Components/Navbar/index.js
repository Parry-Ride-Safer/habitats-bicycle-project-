import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [btnState, setState] = useState(false);
  const [btnLink, setBtnLink] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleClick = () => {
    setState(!btnState);
  };

  const handleClick2 = () => {
    setBtnLink(!btnLink);
  };

  return (
    <>
      <div
        className={btnState ? "menu-btn open" : "menu-btn"}
        onClick={handleClick}
      >
        <div className="menu-btn__burger"></div>
      </div>
      <div>
        <div className={btnState ? "aberto" : "fechado"} onClick={handleClick}>
          {" "}
        </div>
        <div className={btnState ? "tab-wrapper" : "fechado"}>
          <div className="tab-container">
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                Info
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
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
                  toggleState === 1 ? "content  active-content" : "fechado"
                }
              >
                <h2>your Profile</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati praesentium incidunt quia aspernatur quasi quidem
                  facilis quo nihil vel voluptatum?
                </p>
              </div>

              <div
                className={
                  toggleState === 2 ? "content  active-content" : "fechado"
                }
              >
                <h2>your spots</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente voluptatum qui adipisci.
                </p>
              </div>

              <div
                className={
                  toggleState === 3 ? "content  active-content" : "fechado"
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

        {/* <div className={btnState ? "tab-wrapper" : "fechado"}>
          <div class="tab">
            <button class="tablinks" onClick={handleClick2}>
              London
            </button>
            <button class="tablinks" onClick={handleClick2}>
              Paris
            </button>
            <button class="tablinks" onClick={handleClick2}>
              Tokyo
            </button>
          </div>

          <div id="London" class={btnLink ? "tabcontent" : "fechado"}>
            <h3>London</h3>
            <p>London is the capital city of England.</p>
          </div>

          <div id="Paris" class={btnLink ? "tabcontent" : "fechado"}>
            <h3>Paris</h3>
            <p>Paris is the capital of France.</p>
          </div>

          <div id="Tokyo" class={btnLink ? "tabcontent" : "fechado"}>
            <h3>Tokyo</h3>
            <p>Tokyo is the capital of Japan.</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Navbar;
