const reducer = (state, action) => {
    if (action.type === "START_REPORT"){
        return {
            ...state, 
            isReportWindowInputOpen:true}
    }
    if (action.type === "SUBMIT_REPORT"){
        return {
            ...state,
            isBoxWithDoneMsgOpen: true,
            isReportWindowInputOpen: false,
            isBoxShowInputDetailsOpen: true}
    }
    if (action.type === "CONCLUDE_PROCESS"){
        return {
            ...state,
            isBoxWithDoneMsgOpen: false,
            isReportWindowInputOpen: false,
            isBoxShowInputDetailsOpen: false,
            isReportIssueBoxOpen: false,
            isVotingBoxOpen: false}
    }
    if (action.type === "CLOSE_REPORT_WINDOW"){
        return {
            ...state, 
            isReportWindowInputOpen: false}
    }
    if (action.type === "OPEN_MARKER_REPORT"){
        return {
            ...state, 
            isBoxShowInputDetailsOpen: true}
    }
    if (action.type === "OPEN_WINDOW_TO_COMPLAIN"){
        return{
            ...state,
            isReportIssueBoxOpen: true
        }
    }
    if (action.type === "SUBMIT_COMPLAIN"){
        return{
            ...state,
            isReportIssueBoxOpen: false
        }
    }
}

export default reducer;