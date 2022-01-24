import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import dangerLevel from "../../../Data/dangerLevelToVote";
import closeBtn from "../../../icons/modalBoxIcons/close-window-icon.png";
import "./boxDangerDescription.css";

export default function BoxDangerDescription() {
  const {
    alertMsg,
    dangerType,
    isReportWindowInputOpen,
    handleCloseNewReportWindow,
    handleDangerLevel,
    voting,
    dangerFormSubmit,
    reportDescriptionInput,
    handleDangerDescriptionInputs,
    numberOfCharacters,
  } = useGlobalMapContext();

  return (
    <div className={`${isReportWindowInputOpen ? "show-danger-box" : "danger-box-overlay"}`}>
      <form className="danger-form-display" onSubmit={dangerFormSubmit}>
        <button className="close-button" type="button" onClick={handleCloseNewReportWindow}>
          <img className="close-button-img" src={closeBtn} alt=""/>
        </button>
        <p className="title">{dangerType}</p>

        <p className="sub-titles"> Danger Level </p>
        <p className="danger-level-text">Tell the others how serious the issue is</p>
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

        <p className="sub-titles" id="sub-titles-margin">Take a picture</p>
        <button className="add-picture">Submit your picture</button>

        <label className="sub-titles" id="sub-titles-margin"> Description </label>
        <input
          className="danger-description"
          type="text"
          name="description"
          placeholder="Describe the issue in a few words"
          maxLength="60"
          value={reportDescriptionInput.description}
          onChange={handleDangerDescriptionInputs}
        />
        <br />
        <label className="description-input-label">
          {" "}
          {60 - numberOfCharacters} Characters left{" "}
        </label>
        <div/>

        <div className={`${alertMsg ? "show-alert-msg" : "alert-msg-overlay"}`}>
          <p>You need to fill everything</p>
        </div>
        <div className="danger-buttons-display">
          <button
            className="submit-button"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
