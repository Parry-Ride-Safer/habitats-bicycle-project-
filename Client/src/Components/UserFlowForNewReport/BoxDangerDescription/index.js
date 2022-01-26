import React, { useState } from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import dangerLevel from "../../../Data/dangerLevelToVote";
import Alert from "../../ImageUploadForm/alert.js";


import "./boxDangerDescription.css";

export default function BoxDangerDescription() {
  const {
    alertMsg,
    dangerType,
    isReportWindowInputOpen,
    handleDangerLevel,


    handleSubmitFile,
    handleFileInputChange,
    fileInputState,
    previewSource,
    selectedFile,
    successMsg,
    errMsg,



    voting,
    dangerFormSubmit,
    reportDescriptionInput,
    handleDangerDescriptionInputs,
    numberOfCharacters,
  } = useGlobalMapContext();









  return (
    <div
      className={`${
        isReportWindowInputOpen ? "show-danger-box" : "danger-box-overlay"
      }`}
    >
      <form className="danger-form-display" onSubmit={dangerFormSubmit, handleSubmitFile}>
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





        <div className="image-upload-holder">
            <h1 className="title">Upload an Image</h1>
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />

            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '25vh' }}
                />
            )}

            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="upload-form-input"
                />
                
            </form>

        </div>






        <div className="form-holder"></div>
        <label className="danger-input-labels"> Description </label>
        <input
          className="danger-input-fields"
          id="danger-description-input-field"
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


        <p className="danger-input-labels" id="danger-level"> Danger Level </p>
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
