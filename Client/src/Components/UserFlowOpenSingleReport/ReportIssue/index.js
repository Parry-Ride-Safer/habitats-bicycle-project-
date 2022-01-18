import React, { useState } from 'react';
import { useGlobalMapContext } from '../../../Context/mapContext';
import reportIssueOptions from '../../../Data/reportIssueOptions';


const ReportIssue = () => {

  const {isReportIssueBoxOpen} = useGlobalMapContext()
  const [reportIssue, setReportIssue] = useState()

  return (
    <div className={`${isReportIssueBoxOpen ? "show-danger-details" : "danger-box-overlay"}`}>
          <p>Report Issue</p>
          <p>Let us know about issues with this report</p>
          <form>
            {reportIssueOptions.map((reportOption)=>{
                <label key={reportOption.option}>
                <input
                  type="radio"
                  name="reportIssue"
                  check={reportIssue === reportOption.id}
                  value={reportOption.id}
              />
              </label>
            })}
            <button type="submit">Submit</button>
          </form>
      </div>
  )
}

export default ReportIssue;