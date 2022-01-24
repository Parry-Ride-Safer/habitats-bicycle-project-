import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import flagReport from "../../../icons/modalBoxIcons/Flag.png";

export default function ModalShowUserInputDetails() {

    const {
        getReportData,
        handleRateSpotButton,
        handleReportIssueWindow
      } = useGlobalMapContext();

    return(
        <div>
            <p>Info about the number of votes {getReportData.voting}</p>
            <div className="btn-container">
            <button className="submit-btn" type="button" onClick={handleRateSpotButton}>
                Edit Rate
            </button>
            <button className="flag-btn" type="button" onClick={handleReportIssueWindow} >
                <img src={flagReport} alt="" />
            </button>
            </div>
        </div> 

    )
}