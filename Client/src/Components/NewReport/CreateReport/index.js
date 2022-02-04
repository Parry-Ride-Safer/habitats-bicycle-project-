import React, { useEffect, useState } from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import dangerLevel from "../../../Data/dangerLevelToVote";
import issueType from "../../../Data/dangerTypeSelection";
import closeBtn from "../../../icons/modalBoxIcons/close-window-icon.png";
// import Alert from "../../ImageUploadForm/alert.js";

import "./createReport.css";

export default function CreateReport() {
  const {
    alertMsg,
    isReportWindowInputOpen,
    closeReportWindow,
    handleDangerLevel,
    dangerType,
    handleDangerType,

    uploadImage,
    loading,
    image,
    // handleSubmitFile,
    // handleFileInputChange,
    // fileInputState,
    // previewSource,
    // successMsg,
    // errMsg,

    voting,
    dangerFormSubmit,
    reportDescriptionInput,
    handleDangerDescriptionInputs,
    numberOfCharacters,
  } = useGlobalMapContext();

  let user = document.cookie;

  return (
    <div>
      {user ? (
        <div
          className={`${
            isReportWindowInputOpen ? "show-danger-box" : "danger-box-overlay"
          }`}
        >
          <form
            className="danger-form-display"
            onSubmit={dangerFormSubmit /*,handleSubmitFile*/}
          >
            <button
              className="close-button"
              type="button"
              onClick={closeReportWindow}
            >
              <img className="close-button-img" src={closeBtn} alt="" />
            </button>
            <p className="title"> Danger Level </p>
            <p className="danger-level-text">How serious is the issue?</p>
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

            <div className="upload-pic-holder">
              <input
                className="upload-btn"
                type="file"
                name="file"
                placeholder="Upload your image!"
                onChange={uploadImage}
              />

              {loading ? (
                <h3>Loading...</h3>
              ) : (
                <img className="pic-preview" src={image} alt="" />
              )}

              <p className="picture-title">Upload your picture</p>
              {/* <Alert msg={errMsg} type="danger" />
          <Alert msg={successMsg} type="success" />

          {previewSource && (
            <img src={previewSource} alt="chosen" style={{ height: "15vh" }} />
          )}

          <form onSubmit={handleSubmitFile}>
            <input
              id="file-input"
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              className="upload-form-input"
            />
          </form> */}
            </div>

            <p className="issue-title"> Describe the issue </p>
            <div className="danger-type-display">
              {issueType.map((issue, index) => {
                return (
                  <label key={index} className="issueTypeBtn">
                    <input
                      key={index}
                      type="radio"
                      check={dangerType === issue.type}
                      name="dangerType"
                      value={issue.type}
                      onChange={handleDangerType}
                    />
                    {issue.type}
                  </label>
                );
              })}
            </div>
            <input
              className="report-danger-description"
              type="text"
              name="description"
              placeholder="Add a description (optional)"
              maxLength="60"
              value={reportDescriptionInput.description}
              onChange={handleDangerDescriptionInputs}
            />
            <label className="description-input-label">
              {60 - numberOfCharacters} Characters left{" "}
            </label>
            <div />

            <div
              className={`${alertMsg ? "show-alert-msg" : "alert-msg-overlay"}`}
            >
              <p>You need to fill everything</p>
            </div>
            <div className="danger-buttons-display">
              <button className="submit-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
