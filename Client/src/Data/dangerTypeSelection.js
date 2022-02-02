import { ReactComponent as Construction } from "../icons/modalBoxIcons/constructionSign.svg";
import { ReactComponent as Junction } from "../icons/modalBoxIcons/🚦.svg";
import { ReactComponent as Bikelane } from "../icons/modalBoxIcons/bikelaneIcon.svg";

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
    icon: <Junction />,
  },
  {
    type: "Bad Parking",
    nb: 3,
    className: "select-bad-parking",
    icon: <Bikelane />,
  },
  {
    type: "Bike Lane",
    nb: 4,
    className: "select-bike-lane",
    icon: "",
  },
  {
    type: "Junction",
    nb: 5,
    className: "select-Junction",
    icon: "",
  },
  { type: "Traffic", nb: 6, className: "select-traffic", icon: <Construction /> },
  { type: "Other", nb: 7, className: "select-other", icon: <Construction /> }
];

export default issueType;
