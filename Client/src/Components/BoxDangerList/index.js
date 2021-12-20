import { useGlobalDangerContext } from "../../Context/DangerFormContext"
import { useGlobalMapContext } from "../../Context/MapContext";
import "./boxDangerList.css";

export default function BoxDangerDetails () {

    const {isBoxDangerDetailsOpen} = useGlobalDangerContext()

    return(
        <div className={`${isBoxDangerDetailsOpen ? 'show-danger-details' : 'danger-box-overlay'}`}>
         

        </div>
    )
}