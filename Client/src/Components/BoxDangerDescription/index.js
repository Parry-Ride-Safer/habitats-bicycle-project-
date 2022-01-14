import React from "react";
import { useGlobalMapContext } from "../../Context/mapContext";
import dangerLevel from "./dangerLevel";
import "./boxDangerDescription.css";

export default function BoxDangerDescription() {
  const {
    alertMsg,
    dangerType,
    isDangerDescriptionOpen,
    handleDangerLevel,
    voting,
    dangerFormSubmit,
    dangerDescriptionInput,
    handleDangerDescriptionInputs,
    numberOfCharacters,
  } = useGlobalMapContext();

  return (
    <div
      className={`${
        isDangerDescriptionOpen ? "show-danger-box" : "danger-box-overlay"
      }`}
    >
      <form className="danger-form-display" onSubmit={dangerFormSubmit}>
        <button
          className="danger-buttons"
          id="danger-return-button"
          type="button"
        >
          Return
        </button>
        
        
        <div className="danger-category-main-title">
                <h3 className="danger-category-main-title">{dangerType}</h3>
        </div>

        <p className="danger-input-labels">
          {" "}
          Pictures <span>optional</span>{" "}
        </p>
        <button>Submit your picture</button>

        <div className="form-holder"></div>
        <label className="danger-input-labels"> Description </label>
        <input
          className="danger-input-fields"
          id="danger-description-input-field"
          type="text"
          name="description"
          placeholder="Describe the issue in a few words"
          maxLength="60"
          value={dangerDescriptionInput.description}
          onChange={handleDangerDescriptionInputs}
        />
        <br />
        <label className="description-input-label">
          {" "}
          {60 - numberOfCharacters} Characters left{" "}
        </label>
        <div/>


        <p className="danger-input-labels"> Danger Level </p>
        <button>more info</button>
        <p className="danger-input-labels">
          {" "}
          Tell the others how serious the issue is{" "}
        </p>
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
