import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import {ModalShowReportDetails, ModalShowUserInputDetails} from "../../index";
import "./boxShowInputDetails.css";
import closeBtn from "../../../icons/modalBoxIcons/close-window-icon.png";
import example from "./image 28.png";

export default function BoxShowInputDetails() {
  const {
    currentUser,
    fetchReportData,
    getReportData,
    isBoxShowInputDetailsOpen,
    handleBoxShowInputDetailsState
  } = useGlobalMapContext();

  let user = document.cookie;

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

          {(currentUser === getReportData.user_id) ?
            <ModalShowUserInputDetails /> : 
            <ModalShowReportDetails />
          }
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
