const reducer = (state, action) => {
  if (action.type === "START_REPORT") {
    return {
      ...state,
      isReportWindowInputOpen: true,
    };
  }
  if (action.type === "SUBMIT_REPORT") {
    return {
      ...state,
      isBoxWithDoneMsgOpen: true,
      isReportWindowInputOpen: false,
    };
  }
  if (action.type === "CONCLUDE_PROCESS") {
    return {
      ...state,
      isBoxWithDoneMsgOpen: false,
      isReportWindowInputOpen: false,
      isBoxShowInputDetailsOpen: false,
      isReportIssueBoxOpen: false,
      isVotingBoxOpen: false,
    };
  }
  if (action.type === "CLOSE_REPORT_WINDOW") {
    return {
      ...state,
      isBoxShowInputDetailsOpen: false,
      isReportWindowInputOpen: false,
    };
  }
  if (action.type === "OPEN_MARKER_REPORT") {
    return {
      ...state,
      isBoxShowInputDetailsOpen: true,
    };
  }
  if (action.type === "OPEN_COMPLAIN_WINDOW") {
    return {
      ...state,
      isReportIssueBoxOpen: true,
    };
  }
  if (action.type === "SUBMIT_COMPLAIN") {
    return {
      ...state,
      isReportIssueBoxOpen: false,
      isBoxWithDoneMsgOpen: true,
    };
  }
  if (action.type === "OPEN_VOTE_WINDOW") {
    return {
      ...state,
      isVotingBoxOpen: true,
    };
  }
  if (action.type === "SUBMIT_VOTE") {
    return {
      ...state,
      isVotingBoxOpen: false,
      isBoxWithDoneMsgOpen: true,
    };
  }
  if (action.type === "SEND_REPORT_REQUEST"){
    return {
      ...state,
      sendReportRequest: true,
    }
  } 
  if (action.type === "REPORT_REQUEST_CONCLUDE"){
    return {
      ...state,
      sendReportRequest: false,
    }
  }
};

export default reducer;
