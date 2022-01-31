import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import flagReport from "../../../icons/modalBoxIcons/Flag.png";
import dangerLevel from "../../../Data/dangerLevelToVote";
export default function ModalShowReportDetails() {
  const { currentUser, getReportData, findReportID, openVoteWindow, createComplain } =
    useGlobalMapContext();

  return (
    <div>
      <p>{
        (parseInt(getReportData.voting) === 1) ? (<div>{dangerLevel[0].icon} Low Danger </div>) : 
        (parseInt(getReportData.voting) === 2) ? (<div>{dangerLevel[1].icon} Medium Danger </div>) :
        (<div>{dangerLevel[2].icon}, "High Danger"</div>)
      }</p>
      <div className="btn-container">
        <button className="submit-btn" type="button" onClick={openVoteWindow}>
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
