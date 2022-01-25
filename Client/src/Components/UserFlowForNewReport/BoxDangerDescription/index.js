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
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                {/* <button className="btn" type="submit">
                    Submit
                </button> */}
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
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
