import React, {useState, useEffect} from "react"
import Axios from "axios";
import { useGlobalMapContext } from "../../Context/mapContext";
import "./boxShowInputDetails.css";

export default function BoxShowInputDetails () {

    const {selected, isBoxShowInputDetailsOpen, getReportData} = useGlobalMapContext()
 
  
    return(
        <div className={`${isBoxShowInputDetailsOpen ? 'show-danger-details' : 'danger-box-overlay'}`}>
      

        </div>
    )
}