import React, { useState } from "react";
import {issueType} from "../BoxDangerDescription/issueType";
import flagReport from "./Flag.png";
import example from "./image 28.png";
import { useGlobalMapContext } from "../../Context/mapContext";
import "./boxShowInputDetails.css";

export default function BoxShowInputDetails() {
  const {
    fetchReportData,
    getReportData,
    isBoxShowInputDetailsOpen,
    setIsBoxShowInputDetailsOpen,
  } = useGlobalMapContext();
  
  /*const issueCategory = issueType.find(
    (element) => (element.nb = getReportData.category_id)
  );
  console.log(getReportData)*/
  
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);

  return (
    <div
      className={`${
        isBoxShowInputDetailsOpen ? "show-danger-details" : "danger-box-overlay"
      }`}
    >
      {getReportData.length != "" ? (
        <div>
          <div className="close-window-position">
            <button
              type="button"
              onClick={() => {
                setIsBoxShowInputDetailsOpen(false);
              }}
            >
              Close
            </button>
          </div>
          <p>{getReportData.name}</p>
          <p>Date example</p>
          <img className="image-property" src={example} alt="" />
          <p>{getReportData.information}</p>

          {!isNextModalOpen ? (
            <div>
              <p>Info about the number of votes {getReportData.voting}</p>
              <div className="btn-container">
                <button
                  className="submit-btn"
                  type="button"
                  onClick={() => {
                    setIsNextModalOpen(true);
                  }}
                >
                  Rate Spot
                </button>
                <button className="flag-btn" type="button">
                  <img src={flagReport} alt="" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>Danger Level</p>
              <p>icons to vote on this spot</p>
              <div className="btn-container">
                <button
                  className="submit-btn"
                  type="button"
                  onClick={() => {
                    setIsNextModalOpen(false);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="close-window-position">
            <button
              type="button"
              onClick={() => {
                setIsBoxShowInputDetailsOpen(false);
              }}
            >
              Close
            </button>
          </div>
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
