import React, {useState} from "react";
import { useGlobalMapContext } from "../../Context/mapContext";
import dangerLevel from "./dangerLevel";
import "./boxDangerDescription.css";

export default function BoxDangerDescription () {

    const {dangerType, isDangerDescriptionOpen, dangerFormSubmit, dangerDescriptionInputs, handleDangerDescriptionInputs} = useGlobalMapContext();
    const [danger, setDanger] = useState()
    const handleDangerLevel = () => {""}

    return (
        <div className={`${isDangerDescriptionOpen ? 'show-danger-box' : 'danger-box-overlay'}`}>
            <form className="danger-form-display" onSubmit={dangerFormSubmit}>
            <button className="danger-buttons" id="danger-return-button" type="button">Return</button>
                <h3 className="danger-category">{dangerType}</h3>
                <p className="danger-input-labels"> Pictures <span>optional</span> </p>
                <button>Submit your picture</button>

                <label className="danger-input-labels"> Description </label>
                <input className="danger-input-fields" id="danger-description-input-field" 
                    type="text"
                    name="description"
                    placeholder="Describe the issue in a few words" 
                    value={dangerDescriptionInputs.description} 
                    onChange={handleDangerDescriptionInputs}/><br/>

                <p className="danger-input-labels"> Danger Level </p>
                <p className="danger-input-labels"> Tell the others how serious the issue is </p>
                    {dangerLevel.map((danger)=>
                    <input
                        type="radio"
                        name="dangerLevel"
                        check={danger === danger.lv}
                        value={danger.lv}
                        data-icon=""
                        onChange={handleDangerLevel}
                    />
                    )}       
                    <br/>
                <div className="danger-buttons-display">    
                    <button className="danger-buttons" id="danger-submit-button" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}