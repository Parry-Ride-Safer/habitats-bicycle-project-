const reducer = (state, action) => {
    if (action.type === "CREATE_REPORT"){
        return {...state, isReportWindowInputOpen:true}
    }
    if (action.type === "CLOSE_REPORT_WINDOW"){
        return {
            state, 
            isReportWindowInputOpen: false}
    }
    if (action.type === "SUBMIT_REPORT"){
        return {
            state,
            isBoxWithDoneMsgOpen: true,
            isReportWindowInputOpen: false,
           }
    }
}

export default reducer;