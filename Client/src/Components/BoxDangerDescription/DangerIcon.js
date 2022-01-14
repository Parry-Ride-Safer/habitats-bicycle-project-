import React from "react";
import "./boxDangerDescription.css";

const DangerIcon = ({danger, toggleClass, index, voting}) => {
    return(
        <>
        <label>
        <input
        type="radio"
        name="voting"
        className="danger-icon-start"
        check={voting === danger.lv}
        value={danger.lv}
        onClick={() => toggleClass(index)}
        />
        
        <img src={danger.icon} alt=""/>
        </label>
        </>

       
        )
    
}



export default DangerIcon;

