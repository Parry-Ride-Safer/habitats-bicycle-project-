import React from "react";
import { useGlobalDangerContext } from "../../Context/DangerFormContext";
import { useGlobalMapContext } from "../../Context/MapContext";
import "./boxDangerDescription.css";

export default function BoxDangerDescription () {

    const {dangerType, isDangerDescriptionOpen, dangerFormSubmit} = useGlobalMapContext();
    const {dangerDescriptionInputs, handleDangerDescriptionInputs} = useGlobalDangerContext();

    return (
        <div className={`${isDangerDescriptionOpen ? 'show-danger-box' : 'danger-box-overlay'}`}>
            <form className="danger-form-display" onSubmit={dangerFormSubmit}>
                <h3 className="danger-category">{dangerType}</h3>
                <hr className="danger-line"/>
                <p className="danger-input-labels"> Title </p> 
                <input className="danger-input-fields" 
                    type="text" 
                    name="title" 
                    value={dangerDescriptionInputs.title} 
                    onChange={handleDangerDescriptionInputs}/>
                <p className="danger-input-labels"> Picture </p>
                <p>Submit your picture</p>
                <p className="danger-input-labels"> Danger Description </p>
                <input className="danger-input-fields" id="danger-description-input-field" 
                    type="text" 
                    name="description" 
                    value={dangerDescriptionInputs.description} 
                    onChange={handleDangerDescriptionInputs}/><br/>
                <div className="danger-buttons-display">    
                    <button className="danger-buttons" id="danger-submit-button" type="submit">Submit</button>
                    <button className="danger-buttons" id="danger-return-button" type="button">Return</button>
                </div>
            </form>
        </div>
    )
}