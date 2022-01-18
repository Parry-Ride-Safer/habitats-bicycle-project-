import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import {issueType} from "../../UserFlowForNewReport/BoxDangerDescription/issueType";
import flagReport from "./Flag.png";
import example from "./image 28.png";
export default function BoxShowInputDetails() {
  const {
    fetchReportData,
    getReportData,
    isBoxShowInputDetailsOpen,
    handleBoxShowInputDetailsState,
    handleRateSpotButton
  } = useGlobalMapContext();

  return (
    <div
      className={`${isBoxShowInputDetailsOpen ? "show-danger-details" : "danger-box-overlay"}`}
    >
      {getReportData.length != "" ? (
        <div>
          <div className="close-window-position">
            <button
              type="button"
              onClick={handleBoxShowInputDetailsState}
            >
              Close
            </button>
          </div>
          <p>{getReportData.name}</p>
          <p>Date example</p>
          <img className="image-property" src={example} alt="" />
          <p>{getReportData.information}</p>

            <div>
              <p>Info about the number of votes {getReportData.voting}</p>
              <div className="btn-container">
                <button className="submit-btn" type="button" onClick={handleRateSpotButton}>
                  Rate Spot
                </button>
                <button className="flag-btn" type="button">
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
