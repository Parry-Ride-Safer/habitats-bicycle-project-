import { ReactComponent as Construction } from "../icons/modalBoxIcons/🚧.svg";
import { ReactComponent as Junction } from "../icons/modalBoxIcons/🚦.svg";
import { ReactComponent as Bikelane } from "../icons/modalBoxIcons/🚲.svg";

export const issueType = [
  {
    type: "Construction",
    nb: 1,
    className: "select-construction",
    icon: <Construction />
  },
  { 
    type: "Junction",
    nb: 2, 
    className: "select-junction", 
    icon: <Junction /> 
  },
  {
    type: "Bike Lane",
    nb: 3,
    className: "select-bike-lane",
    icon: <Bikelane />
  },
  { 
    type: "Road",
    nb: 4, 
    className:"select-road",
    icon: "" 
  },
  {
    type: "Traffic",
    nb: 5,
    className: "select-traffic",
    icon: ""
  },
  { type: "Other", 
    nb: 6, 
    className: "select-other", 
    icon: <Construction /> }
];

