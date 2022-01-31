import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import flagReport from "../../../icons/modalBoxIcons/Flag.png";
import dangerLevel from "../../../Data/dangerLevelToVote";

export default function ModalShowUserInputDetails() {
  const { getReportData, openVoteWindow, createComplain } =
    useGlobalMapContext();


  return (
    <div>
      <p>{
        (parseInt(getReportData.voting) === 1) ? dangerLevel[0].icon : 
        (parseInt(getReportData.voting) === 2) ? dangerLevel[1].icon :
        dangerLevel[2].icon
      }</p>
      <p>including mine</p>
      <p>{Number(getReportData.voting).toFixed(1)}</p>
      <div className="btn-container">
        <button className="submit-btn" type="button" onClick={openVoteWindow}>
          Edit Spot
        </button>
        <button className="flag-btn" type="button" onClick={createComplain}>
          <img src={flagReport} alt="" />
        </button>
      </div>
    </div>
  );
}
