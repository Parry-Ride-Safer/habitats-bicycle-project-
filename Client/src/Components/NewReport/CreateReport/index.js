import React from "react";
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
    setDangerType,

    handleOnChange,
    handleOnSubmit,
    imageSrc,
    uploadData,

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
        <p className="danger-level-text">
          Tell the others how serious the issue is
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

        <div className="image-upload-holder">


      <main className="main">
        <h1 className="title-upload">
          Image Uploader
        </h1>

        <p className="subtitle">
          Upload your image to Cloudinary!
        </p>

        <form className="upload-form" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>
          
          <img src={imageSrc} width="300" />
          
          {imageSrc && !uploadData && (
            <p>
              <button>Upload File</button>
            </p>
          )}

          {uploadData && (
            <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )}
        </form>
      </main>


    

          {/* <h1 className="title">Upload an Image</h1>
          <Alert msg={errMsg} type="danger" />
          <Alert msg={successMsg} type="success" />

          {previewSource && (
            <img src={previewSource} alt="chosen" style={{ height: "15vh" }} />
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
          </form> */}

          
        </div>
        <p className="title"> What's the issue? </p>
        <div>
          {issueType.map((issue, index) => (
            <button
              key={index}
              type="radio"
              className="issueTypeBtn"
              name="dangerType"
              value={issue.type}
              onClick={() => {
                setDangerType(issue.type);
              }}
            >
              {issue.icon}{issue.type}
            </button>
          ))}
        </div>
        <label className="sub-titles" id="sub-titles-margin">
          {" "}
          Description{" "}
        </label>
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
        <div />

        <div className={`${alertMsg ? "show-alert-msg" : "alert-msg-overlay"}`}>
          <p>You need to fill everything</p>
        </div>
        <div className="danger-buttons-display">
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>)
  : null}
</div>
  );
}
