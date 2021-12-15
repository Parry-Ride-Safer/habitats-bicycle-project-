import React from "react";
import { useGlobalMapContext } from "../../Context/MapContext";
import "./boxDangerDescription.css";

export default function BoxDangerDescription () {

    const {isDangerDescriptionOpen} = useGlobalMapContext();
    
    return (
        <div className={`${isDangerDescriptionOpen ? 'show-danger-box' : 'danger-box-overlay'}`}>
            <div className="danger-box-container">
            <button type="button"></button>
            <form >
                <p>Danger Type</p>
                <p>Short Title</p>
                <p>Picture</p>
                <p>Detailed description</p>
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}