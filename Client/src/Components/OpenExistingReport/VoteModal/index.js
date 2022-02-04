import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import flagReport from "../../../icons/modalBoxIcons/Flag.png";
import dangerLevel from "../../../Data/dangerLevelToVote";
import "./voteModal.css";

export default function ModalShowReportDetails() {
  const { currentUser, getReportData, findReportID, openVoteWindow, createComplain } =
    useGlobalMapContext();

  return (
    <div className="vote-layout">
      <div className="edit-vote-display">
        <p>{
          (parseInt(getReportData.voting) === 1) ? (<div>{dangerLevel[0].icon} </div>) : 
          (parseInt(getReportData.voting) === 2) ? (<div>{dangerLevel[1].icon} </div>) :
          (<div>{dangerLevel[2].icon} </div>)
        }</p>
        <div className="layout-edit-window">
          <p className="danger-title">{
            (parseInt(getReportData.voting) === 1) ? "Low danger" : 
            (parseInt(getReportData.voting) === 2) ? "Medium danger" :
            "High danger"
          }</p>
          <p className="rating-qtt">{getReportData.count} ratings 
          {(currentUser === getReportData.user_id ||
                (currentUser !== getReportData.user && findReportID)) ?
                <span className="visitor-vote"> including mine</span> : ""}   
          </p>
        </div>
      </div>
      <div className="center-btn">
        <button className="submit-button" type="button" onClick={openVoteWindow}>
            {(currentUser === getReportData.user_id ||
                (currentUser !== getReportData.user && findReportID)) ?
                "Edit Vote" : "Rate Spot"}       
          </button>
          <button className="flag-btn" type="button" onClick={createComplain}>
            <img src={flagReport} alt="" />
          </button>
          </div>
    </div>
  );
}