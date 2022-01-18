import React from 'react';
import { useGlobalMapContext } from "../../../Context/mapContext";
import "./boxDoneMsg.css";

const BoxDoneMsg = () => {
   
    const {isBoxWithDoneMsgOpen, showSubmittedReport} = useGlobalMapContext()

    return (
        <div
      className={`${isBoxWithDoneMsgOpen ? "show-danger-details" : "danger-box-overlay"}`}
    >
            <p>image</p>
            <p>Thanks for making the streets safer for other roders!</p>
            <button type="button" onClick={showSubmittedReport}> Done</button>
        </div>
    )
}

export default BoxDoneMsg;