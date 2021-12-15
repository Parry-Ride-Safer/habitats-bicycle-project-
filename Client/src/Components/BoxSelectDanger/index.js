import React from "react";
import { useGlobalMapContext } from "../../Context/MapContext";
import "./boxSelectDanger.css";

export default function BoxSelectDanger () {

    const {dangerType, setDangerType, isBoxSelectDangerOpen, handleDangerChoice, handleDangerSubmit, handleCloseModal} = useGlobalMapContext();
    
   

    return (
        <div className={`${isBoxSelectDangerOpen ? 'show-box' : 'box-overlay'}`}>
            <div className="box-container">
            <form  onSubmit={handleDangerSubmit}>
                <button type="submit" value="Construction" onClick={handleDangerChoice}>Construction</button>
                <button type="submit" value="Intersection" onClick={handleDangerChoice}>Intersection</button>
                <button type="submit" value="Bikeline" onClick={handleDangerChoice}>Bikeline</button>
                <button type="submit" value="Other" onClick={handleDangerChoice}>Other</button>       
            </form>
            <button type="button" onClick={handleCloseModal}> Close window </button>    
            </div>
        </div>
    )
}