import React from "react";
import { useGlobalDangerContext } from "../../Context/dangerFormContext";
import { useGlobalMapContext } from "../../Context/MapContext";
import "./boxDangerDescription.css";

export default function BoxDangerDescription () {

    const {dangerType, isDangerDescriptionOpen, dangerFormSubmit} = useGlobalMapContext();
    const {dangerTitle, setDangerTitle} = useGlobalDangerContext();

    return (
        <div className={`${isDangerDescriptionOpen ? 'show-danger-box' : 'danger-box-overlay'}`}>
            <form onSubmit={dangerFormSubmit}>
                <h3>{dangerType}</h3>
                <label> Title
                <input type="text" value={dangerTitle} onChange={(e) => setDangerTitle(e.target.value)}/>
                </label>
                <p>Picture</p>
                <input />
                <button type="submit">Submit</button>
            </form>
            <button type="button">Close button</button>
        </div>
    )
}