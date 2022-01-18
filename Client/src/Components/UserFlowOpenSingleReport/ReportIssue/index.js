import React from 'react';
import reportIssueData from './reportIssueData';


const ReportIssue = () => {
    {/*onChange={handleDangerLevel*/}
    retutn (
        <div>
            <p>Report Issue</p>
            <p>Let us know about issues with this report</p>
            {reportIssueData.map((reportIssue, index)=>{
                <label key={index}>
                <input
                  type="radio"
                  name="reportIssue"
                  check={reportIssue === reportIssueData.id}
                  value={reportIssueData.id}
               />
              </label>
            })}
             <button type="submit">Submit</button>
        </div>
    )
}

export default ReportIssue;