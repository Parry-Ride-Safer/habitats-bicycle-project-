import React, {useState} from "react";
import { useGlobalMapContext } from "../../Context/mapContext";
import dangerLevel from "./dangerLevel";
import "./boxDangerDescription.css";
import DangerIcon from "./DangerIcon";

export default function BoxDangerDescription () {

const {alertMsg, dangerType, isDangerDescriptionOpen, handleDangerLevel, voting, dangerFormSubmit, dangerDescriptionInput, handleDangerDescriptionInputs, numberOfCharacters} = useGlobalMapContext();

const [iconArray, setIconArray] = useState(dangerLevel);

const toggleClass = (index) => {
    console.log("A função foi invocada")
    console.log(iconArray)
    setIconArray( (prev) => {

const newSet = [...prev]

newSet[index].selected=!newSet[index].selected

return newSet 

    });
}


return (
    <div className={`${isDangerDescriptionOpen ? 'show-danger-box' : 'danger-box-overlay'}`}>
        <form className="danger-form-display" onSubmit={dangerFormSubmit}>
            <button className="danger-buttons" id="danger-return-button" type="button">Return</button>
            <div className="main-title">
                <h3 className="danger-category-main-title">{dangerType}</h3>
            </div>
            
            <div className="form-holder">
            <p className="danger-input-labels"> Upload Picture </p>
            <input className="danger-input-fields" id="danger-description-input-field" 
                type="text"
                name="description"
                placeholder="Upload your picture"
                value={dangerDescriptionInput.description} 
                onChange={handleDangerDescriptionInputs}/>
            </div>

            <div className="form-holder">
            <label className="danger-input-labels"> Description </label>
            <input className="danger-input-fields" id="danger-description-input-field" 
                type="text"
                name="description"
                placeholder="Describe the issue in a few words"
                maxlength="60" 
                value={dangerDescriptionInput.description} 
                onChange={handleDangerDescriptionInputs}/><br/>
            <label className="description-input-label"> {60 - numberOfCharacters} Characters left </label>
            </div>

            <p className="danger-input-labels"> Danger Level </p>
            <button>more info</button>
            <p className="danger-input-labels"> Tell the others how serious the issue is </p>
            
            
            
            <div className="dangerLevelVote">
                {iconArray.map((danger, index)=>
            <DangerIcon index={index} toggleClass={toggleClass} danger={danger} key={index}/>
                )}
            </div>     
            
            
            
            
            <div className={`${alertMsg ? "show-alert-msg" : "alert-msg-overlay"}`}>
                <p>You need to fill everything</p>
            </div>
            <div className="danger-buttons-display">    
                <button className="danger-buttons" id="danger-submit-button" type="submit">Submit</button>
            </div>
        </form>
    </div>
    )
}