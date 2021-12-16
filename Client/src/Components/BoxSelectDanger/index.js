import React from "react";
import { useGlobalMapContext } from "../../Context/MapContext";
import "./boxSelectDanger.css";

export default function BoxSelectDanger () {

    const {setDangerType, isBoxSelectDangerOpen, handleDangerSubmit, handleCloseModal} = useGlobalMapContext();
    
   
    return (
        <div className={`${isBoxSelectDangerOpen ? 'show-box' : 'box-overlay'}`}>
            <div className="box-container">
            <form onSubmit={handleDangerSubmit}>
                <button type="submit" name="dangerType" value="Construction" onClick={(event)=>setDangerType(event.target.value)}>Construction</button>
                <button type="submit" name="dangerType" value="Intersection" onClick={(event)=>setDangerType(event.target.value)}>Intersection</button>
                <button type="submit" name="dangerType" value="Bikeline" onClick={(event)=>setDangerType(event.target.value)}>Bikeline</button>
                <button type="submit" name="dangerType" value="Other" onClick={(event)=>setDangerType(event.target.value)}>Other</button>       
            </form>
            <button type="button" onClick={handleCloseModal}> Close window </button>    
            </div>
        </div>
    )
}