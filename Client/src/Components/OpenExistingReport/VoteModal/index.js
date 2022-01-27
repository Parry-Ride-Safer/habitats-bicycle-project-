import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import flagReport from "../../../icons/modalBoxIcons/Flag.png";

export default function ModalShowReportDetails() {

  const {
    getReportData,
    isSpotVoted,
    openVoteWindow,
    createComplain,
  } = useGlobalMapContext();

    return (
        <div>
            <p>Info about the number of votes {getReportData.voting}</p>
            <div className="btn-container">
              <button className="submit-btn" type="button" onClick={openVoteWindow}>
                {isSpotVoted === "" ? "Rate Spot" : "Edit Vote"}
              </button>
              <button className="flag-btn" type="button" onClick={createComplain} >
                <img src={flagReport} alt="" />
              </button>
            </div>
        </div>
    )
}