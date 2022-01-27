import React, { useState } from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import dangerLevel from "../../../Data/dangerLevelToVote";
import issueType from "../../../Data/dangerLevelToVote";
import closeBtn from "../../../icons/modalBoxIcons/close-window-icon.png";
import Alert from "../../ImageUploadForm/alert.js";


import "./boxDangerDescription.css";

export default function BoxDangerDescription() {
  const {
    alertMsg,
    dangerType,
    isReportWindowInputOpen,
    handleCloseNewReportWindow,
    handleDangerLevel,
    setDangerType,
    voting,
    dangerFormSubmit,
    reportDescriptionInput,
    handleDangerDescriptionInputs,
    numberOfCharacters,
  } = useGlobalMapContext();

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
};

const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
};

const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
        uploadImage(reader.result);
    };
    reader.onerror = () => {
        console.error('AHHHHHHHH!!');
        setErrMsg('something went wrong!');
    };
};


const uploadImage = async (base64EncodedImage) => {
  try {
      await fetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify({ data: base64EncodedImage }),
          headers: { 'Content-Type': 'application/json' },
      });
      setFileInputState('');
      setPreviewSource('');
      setSuccessMsg('Image uploaded successfully');

  } catch (err) {
      console.error(err);
      setErrMsg('Something went wrong!');
  }
};



// const ImageForm = () => {
//   return(
//     <div>
//             <h1 className="title">Upload an Image</h1>
//             <Alert msg={errMsg} type="danger" />
//             <Alert msg={successMsg} type="success" />
//             <form onSubmit={handleSubmitFile} className="form">
//                 <input
//                     id="fileInput"
//                     type="file"
//                     name="image"
//                     onChange={handleFileInputChange}
//                     value={fileInputState}
//                     className="form-input"
//                 />
//                 <button className="btn" type="submit">
//                     Submit
//                 </button>
//             </form>
//             {previewSource && (
//                 <img
//                     src={previewSource}
//                     alt="chosen"
//                     style={{ height: '300px' }}
//                 />
//             )}
//         </div>
//   );
// }


  return (
    <div
      className={`${
        isReportWindowInputOpen ? "show-danger-box" : "danger-box-overlay"
      }`}
    >
      <form className="danger-form-display" onSubmit={dangerFormSubmit /*,handleSubmitFile*/}>
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





        <div className="image-upload-holder">
            <h1 className="title">Upload an Image</h1>
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                 <button className="btn" type="submit">
                    Submit
                </button> 
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>

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
        {issueType.map((issue, index) => (
          <button
            key={index}
             
              type="submit"
              name="dangerType"
              value={issue.type}
              onClick={(event) => {
                setDangerType(issue.type)
              }}
            >
              {issue.type}
          </button>
        ))}

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
