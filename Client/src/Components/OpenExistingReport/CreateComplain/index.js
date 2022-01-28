import React, { useState } from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import reportIssueOptions from "../../../Data/reportIssueOptions";
import "./createComplain.css";

const CreateComplain = () => {
  const { submitComplain, isReportIssueBoxOpen } = useGlobalMapContext();
  const [reportIssue, setReportIssue] = useState();

  return (
    <div
      className={`${
        isReportIssueBoxOpen ? "show-reportIssue-box" : "reportIssue-overlay"
      }`}
    >
      <p className="title-reportIssue">Report Issue</p>
      <p className="subTitle-reportIssue">
        Let us know about issues with this report
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
                check={reportIssue === reportOption.id}
                value={reportOption.id}
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
