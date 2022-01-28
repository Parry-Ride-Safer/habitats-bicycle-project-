import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import flagReport from "../../../icons/modalBoxIcons/Flag.png";
import dangerLevel from "../../../Data/dangerLevelToVote";
export default function ModalShowReportDetails() {
  const { getReportData, isSpotVoted, openVoteWindow, createComplain } =
    useGlobalMapContext();

  return (
    <div>
       <p>{
        (parseInt(getReportData.voting) === 1) ? dangerLevel[0].icon : 
        (parseInt(getReportData.voting) === 2) ? dangerLevel[1].icon :
        dangerLevel[2].icon
      }</p>
      <div className="btn-container">
        <button className="submit-btn" type="button" onClick={openVoteWindow}>
          {isSpotVoted === "" ? "Rate Spot" : "Edit Vote"}
        </button>
        <button className="flag-btn" type="button" onClick={createComplain}>
          <img src={flagReport} alt="" />
        </button>
      </div>
    </div>
  );
}
