import React from "react";
import { useGlobalMapContext } from "../../Context/MapContext";
import {InfoBox} from '@react-google-maps/api';
import "./boxSelectDanger.css";

export default function BoxSelectDanger () {

    const {markers, setDangerType, handleDangerSubmit} = useGlobalMapContext();
    const boxOptions = { closeBoxURL: '', enableEventPropagation: false };
   
    return (
      <InfoBox position={markers} options={boxOptions}>
        <form className="info-box-display" onSubmit={handleDangerSubmit}>
            <button className="select-danger-buttons" type="submit" name="dangerType" value="Construction" onClick={(event)=>setDangerType(event.target.value)}>Construction</button>
            <button className="select-danger-buttons" type="submit" name="dangerType" value="Intersection" onClick={(event)=>setDangerType(event.target.value)}>Intersection</button>
            <button className="select-danger-buttons" type="submit" name="dangerType" value="Bikeline" onClick={(event)=>setDangerType(event.target.value)}>Bikeline</button>
            <button className="select-danger-buttons" type="submit" name="dangerType" value="Other" onClick={(event)=>setDangerType(event.target.value)}>Other</button>       
        </form>
      </InfoBox>
    )
}