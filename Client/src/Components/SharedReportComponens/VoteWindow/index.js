import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import dangerLevel from "../../../Data/dangerLevelToVote";
import "./votingBox.css";

export default function VotingBox() {
  const {
    dispatch,
    isVotingBoxOpen,
    handleAddVote,
    handleDangerLevel,
    voting,
  } = useGlobalMapContext();

  return (
    <div
      className={`${isVotingBoxOpen ? "show-vote-box" : "vote-box-overlay"}`}
    >
      <form className="danger-form-display" onSubmit={handleAddVote}>
        <p className="title-vote"> Give your input </p>
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
          <div className="clear-button-register" onClick={()=>dispatch({ type: "CLOSE_VOTE_WINDOW" })}></div>
        </div>
        <div className="danger-buttons-display">
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
