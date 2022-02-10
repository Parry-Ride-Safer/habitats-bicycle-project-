import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import dangerLevel from "../../../Data/dangerLevelToVote";
import "./voteModal.css";

export default function VisitorVoteModal() {
  const {getReportData} =
    useGlobalMapContext();

  return (
    <div className="vote-layout">
      <div className="edit-vote-display">
        {
             ((Number(getReportData.voting).toFixed(2) <=1.29) ? (<div>{dangerLevel[0].icon} </div>) :
             (
               (Number(getReportData.voting).toFixed(2) >= 1.30) && 
               (Number(getReportData.voting).toFixed(2) <=2.29) 
             ) ?  (<div>{dangerLevel[1].icon} </div>) :  (<div>{dangerLevel[2].icon} </div>))
        }
        <div className="layout-edit-window">
          <p className="danger-title">{
            (parseInt(getReportData.voting) === 1) ? "Low danger" : 
            (parseInt(getReportData.voting) === 2) ? "Medium danger" :
            "High danger" 
          }</p>
          <p className="rating-qtt">{getReportData.count} rating(s) 
         
          </p>
        </div>
      </div>
    </div>
  );
}