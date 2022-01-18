import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import dangerLevel from "../../../Data/dangerLevelToVote";
import "./votingBox.css";

export default function VotingBox() {
  const {
    alertMsg,
    isVotingBoxOpen,
    handleAddVote,
    handleDangerLevel,
    voting,
  } = useGlobalMapContext();

  return (
    <div className={`${isVotingBoxOpen ? "show-danger-box" : "danger-box-overlay"}`}>
      <form className="danger-form-display" onSubmit={handleAddVote}>
        <p className="danger-input-labels"> Danger Level </p>
        <div className="dangerLevelVote">
          {dangerLevel.map((danger, index) => (
            <label key={index}>
              <input
                type="radio"
                name="voting"
                className={danger.class}
                check={voting === danger.lv}
                value={danger.lv}
                onChange={handleDangerLevel}
              />
              {danger.icon}
            </label>
          ))}
        </div>
        <div className={`${alertMsg ? "show-alert-msg" : "alert-msg-overlay"}`}>
          <p>You need to fill everything</p>
        </div>
        <div className="danger-buttons-display">
          <button 
            className="danger-buttons" 
            id="danger-submit-button"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
