import { ReactComponent as Construction } from "./dangerLevelIcons/🚧.svg";
import { ReactComponent as Junction } from "./dangerLevelIcons/🚦.svg";
import { ReactComponent as Bikelane } from "./dangerLevelIcons/🚲.svg";

const issueType = [
  {
    type: "Construction",
    id: 1,
    className: "select-construction",
    icon: <Construction />,
  },
  { type: "Junction", id: 2, className: "select-junction", icon: <Junction /> },
  {
    type: "Bike Lane",
    id: 3,
    className: "select-bike-lane",
    icon: <Bikelane />,
  },
  { type: "Road", id: 4, className: "select-road", icon: <Construction /> },
  {
    type: "Traffic",
    id: 5,
    className: "select-traffic",
    icon: <Construction />,
  },
  { type: "Other", id: 6, className: "select-other", icon: <Construction /> },
];

export { issueType };
