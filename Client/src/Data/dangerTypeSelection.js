import { ReactComponent as Construction } from "../icons/modalBoxIcons/constructionSign3.svg";
// import { ReactComponent as Junction } from "../icons/modalBoxIcons/🚦.svg";
import { ReactComponent as Bikelane } from "../icons/modalBoxIcons/bikeIcon3.svg";
import { ReactComponent as BadParking } from "../icons/modalBoxIcons/badParking3.svg";
import { ReactComponent as BadRoadIcon } from "../icons/modalBoxIcons/badRoadIcon3.svg";
import { ReactComponent as Junction } from "../icons/modalBoxIcons/junctionIcon3.svg";
import { ReactComponent as Traffic } from "../icons/modalBoxIcons/trafficIcon3.svg";
import { ReactComponent as Other } from "../icons/modalBoxIcons/otherIcon3.svg";

const issueType = [
  {
    type: "Construction",
    nb: 1,
    className: "select-construction",
    icon: <Construction />,
  },
  {
    type: "Road Damage",
    nb: 2,
    className: "select-road",
    icon: <BadRoadIcon />,
  },
  {
    type: "Bad Parking",
    nb: 3,
    className: "select-bad-parking",
    icon: <BadParking />,
  },
  {
    type: "Bike Lane",
    nb: 4,
    className: "select-bike-lane",
    icon: <Bikelane />,
  },
  {
    type: "Junction",
    nb: 5,
    className: "select-Junction",
    icon: <Junction />,
  },
  {
    type: "Traffic",
    nb: 6,
    className: "select-traffic",
    icon: <Traffic />,
  },
  { type: "Other", nb: 7, className: "select-other", icon: <Other /> },
];

export default issueType;
