import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import { ReactComponent as DoneMsg } from "../../../icons/modalBoxIcons/🙏.svg";
import "./boxDoneMsg.css";

const BoxDoneMsg = () => {
  const { isBoxWithDoneMsgOpen, reportProcessDone } = useGlobalMapContext();

  return (
    <div
      className={`${
        isBoxWithDoneMsgOpen ? "show-done-msg" : "done-msg-overlay"
      }`}
    >
      <p>
        <DoneMsg />
      </p>
      <p className="text">
        Thanks for making the streets safer for other riders!
      </p>
      <button
        className="done-msg-btn"
        type="button"
        onClick={reportProcessDone}
      >
        {" "}
        Done
      </button>
    </div>
  );
};

export default BoxDoneMsg;
