const reducer = (state, action) => {
    if (action.type === "CREATE_REPORT"){
        return {...state, isReportWindowInputOpen:true}
    }
    if (action.type === "CLOSE_REPORT_WINDOW"){
        return {state, isReportWindowInputOpen: false}
    }
}

export default reducer;