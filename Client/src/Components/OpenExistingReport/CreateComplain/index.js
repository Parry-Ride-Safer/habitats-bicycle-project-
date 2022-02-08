import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import reportIssueOptions from "../../../Data/reportIssueOptions";
import "./createComplain.css";

const CreateComplain = () => {
  const { submitComplain, isReportIssueBoxOpen, handleFlagOption, reportIssue } = useGlobalMapContext();

  return (
    <div
      className={`${
        isReportIssueBoxOpen ? "show-reportIssue-box" : "reportIssue-overlay"
      }`}
    >
      <p className="title-reportIssue">Report Issue</p>
      <p className="subTitle-reportIssue">
        Why are you flagging this report?
      </p>
      <form className="report-form-display" onSubmit={submitComplain}>
        {reportIssueOptions.map((reportOption) => {
          return (
            <div className="input-reportIssue-display">
              <label key={reportOption.option} />
              <input
                type="radio"
                name="reportIssue"
                className="input"
                check={reportIssue === reportOption.title}
                value={reportOption.title}
                onChange={handleFlagOption}
              />
              <p className="boldSubTitle-reportIssue">
                {reportOption.title}
                <span className="subTitle-reportIssue">
                  {" "}
                  - {reportOption.description}
                </span>
              </p>
            </div>
          );
        })}
        <button className="reportIssue-submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateComplain;
