import React from "react";
import { useGlobalMapContext } from "../../Context/MapContext";
import {InfoBox} from '@react-google-maps/api';
import "./boxSelectDanger.css";

export default function BoxSelectDanger () {

    const {markers, setDangerType, handleDangerSubmit, handleCloseModal} = useGlobalMapContext();
    const boxOptions = { closeBoxURL: '', enableEventPropagation: false };
   
    return (
      <InfoBox position={markers} options={boxOptions}>
         <div className="infoBox">
          <div style={{ fontSize: 16, fontColor: `#08233B` }}></div>
              <form onSubmit={handleDangerSubmit}>
                  <button type="submit" name="dangerType" value="Construction" onClick={(event)=>setDangerType(event.target.value)}>Construction</button>
                  <button type="submit" name="dangerType" value="Intersection" onClick={(event)=>setDangerType(event.target.value)}>Intersection</button>
                  <button type="submit" name="dangerType" value="Bikeline" onClick={(event)=>setDangerType(event.target.value)}>Bikeline</button>
                  <button type="submit" name="dangerType" value="Other" onClick={(event)=>setDangerType(event.target.value)}>Other</button>       
              </form>
              <button type="button" onClick={handleCloseModal}> Close window </button>
            </div>   
      </InfoBox>
    )
}