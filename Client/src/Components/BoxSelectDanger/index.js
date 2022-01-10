import React from "react";
import { useGlobalMapContext } from "../../Context/MapContext";
import { InfoBox } from "@react-google-maps/api";
import "./boxSelectDanger.css";

export default function BoxSelectDanger() {
  const {
    markers,
    setDangerType,
    handleDangerSubmit,
    dangerTypeConvert,
    setdangerTypeConvert,
  } = useGlobalMapContext();
  const boxOptions = { closeBoxURL: "", enableEventPropagation: false };

  return (
    <InfoBox position={markers} options={boxOptions}>
      <div style={{ opacity: 0.75, padding: 5 }}>
        <form className="info-box-display" onSubmit={handleDangerSubmit}>
          <button
            className="select-danger-buttons"
            type="submit"
            name="dangerType"
            value="Construction"
            onClick={() =>
              setDangerType("Construction") + setdangerTypeConvert(1)
            }
          >
            Construction
          </button>
          <button
            className="select-danger-buttons"
            type="submit"
            name="dangerType"
            value="Intersection"
            onClick={() =>
              setDangerType("Intersection") + setdangerTypeConvert(2)
            }
          >
            Intersection
          </button>
          <button
            className="select-danger-buttons"
            type="submit"
            name="dangerType"
            value="Bikeline"
            onClick={() => setDangerType("Bikeline") + setdangerTypeConvert(3)}
          >
            Bikeline
          </button>
          <button
            className="select-danger-buttons"
            type="submit"
            name="dangerType"
            value="Other"
            onClick={() => setDangerType("Other") + setdangerTypeConvert(4)}
          >
            Other
          </button>
        </form>
      </div>
    </InfoBox>
  );
}
