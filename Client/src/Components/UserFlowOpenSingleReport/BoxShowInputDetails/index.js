import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import "./boxShowInputDetails.css";
import closeBtn from "../../../icons/modalBoxIcons/close-window-icon.png";
import flagReport from "./Flag.png";
import example from "./image 28.png";

export default function BoxShowInputDetails() {
  const {
    fetchReportData,
    getReportData,
    isBoxShowInputDetailsOpen,
    handleBoxShowInputDetailsState,
    handleRateSpotButton,
    handleReportIssueWindow
  } = useGlobalMapContext();

  return (
    <div
      className={`${isBoxShowInputDetailsOpen ? "show-spot-details" : "spot-box-overlay"}`}
    >
      {getReportData.length !== "" ? (
        <div>
          <button
            className="close-button"
            type="button"
            onClick={handleBoxShowInputDetailsState}
          >
             <img className="close-button-img" src={closeBtn} alt=""/>
          </button>
         
          <p className="title">{getReportData.name}</p>
          <img className="add-picture" src={example} alt="" />
          <p className="sub-titles">{getReportData.information}</p>

          {}
            <div>
              <p>Info about the number of votes {getReportData.voting}</p>
              <div className="btn-container">
                <button className="submit-btn" type="button" onClick={handleRateSpotButton}>
                  Rate Spot
                </button>
                <button className="flag-btn" type="button" onClick={handleReportIssueWindow} >
                  <img src={flagReport} alt="" />
                </button>
              </div>
            </div>
        </div>
      ) : (
        <div>
          <p>loading</p>
          <button
            onClick={() => {
              fetchReportData();
            }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
