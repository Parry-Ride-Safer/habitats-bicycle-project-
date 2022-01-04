import { useGlobalMapContext } from "../../Context/MapContext";
import "./boxDangerList.css";

export default function BoxDangerDetails () {

    const {isBoxDangerDetailsOpen} = useGlobalMapContext()

    return(
        <div className={`${isBoxDangerDetailsOpen ? 'show-danger-details' : 'danger-box-overlay'}`}>
         

        </div>
    )
}