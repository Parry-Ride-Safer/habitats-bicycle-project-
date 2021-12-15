import React from "react";
import { useGlobalMapContext } from "../../Context/MapContext";
import "./boxSelectDanger.css";

export default function BoxSelectDanger () {

    const {isBoxSelectDangerOpen} = useGlobalMapContext();

    return (
        <div className={`${isBoxSelectDangerOpen ? 'show-box' : 'box-overlay'}`}>
            <form className="box-container" onSubmit={handleDangerSubmit}>
                <button type="submit" onClick={()=>}>Construction</button>
                <button type="submit">Intersection</button>
                <button type="submit">Bikeline</button>
                <button type="submit">Other</button>             
            </form>
        </div>
    )
}