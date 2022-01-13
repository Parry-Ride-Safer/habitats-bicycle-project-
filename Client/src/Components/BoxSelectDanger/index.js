import React from "react";
import { useGlobalMapContext } from "../../Context/mapContext";
import { InfoBox } from "@react-google-maps/api";
import issueType from "./issueType";
import "./boxSelectDanger.css";

export default function BoxSelectDanger() {
  const {
    markers,
    setDangerType,
    handleDangerSubmit,
    setdangerTypeConvert,
    stateLogin,
    setStateLogin,
  } = useGlobalMapContext();
  const boxOptions = {
    closeBoxURL: "",
    enableEventPropagation: false,
    boxStyle: {
      border: 0,
      width: "30vw",
      borderRadius: "6px",
      boxShadow: "1px 3px 30px 1px #000000",
    },
  };

  let user = JSON.parse(localStorage.getItem("user-info"));

  return (
    <>
      {user ? (
        <InfoBox position={markers} options={boxOptions}>
          <div style={{ backgroundColor: "white", opacity: 0.75, padding: 2 }}>
            <div style={{ fontSize: 16, fontColor: `#08233B` }}>
              <form className="info-box-display" onSubmit={handleDangerSubmit}>
                <h3>Issue Type</h3>
                {issueType.map((issue) => (
                  <button
                    className={issue.className}
                    type="submit"
                    name="dangerType"
                    value={issue.type}
                    onClick={() =>
                      setDangerType(issue.type) + setdangerTypeConvert(issue.id)
                    }
                  >
                    {issue.type}
                  </button>
                ))}
              </form>
            </div>
          </div>
        </InfoBox>
      ) : null}
    </>
  );
}
