import React from "react";
import { useGlobalMapContext } from "../../Context/MapContext";
import "./boxDangerDescription.css";

export default function BoxDangerDescription () {

    const {dangerType, isDangerDescriptionOpen, dangerFormSubmit} = useGlobalMapContext();
    
    return (
        <div className={`${isDangerDescriptionOpen ? 'show-danger-box' : 'danger-box-overlay'}`}>
            <div className="danger-box-container">
            <button type="button">Close button</button>
                <form onSubmit={dangerFormSubmit}>
                    <h3>{dangerType}</h3>
                    <p>Short Title</p>
                    <p>Picture</p>
                    <p>Detailed description</p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}